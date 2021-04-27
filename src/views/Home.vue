<template>
  <div class="theater">
    <div align="left" class = "tsis">Tsis</div>
    <div class="movie">
      <div class="box">
        <p style="color : gray" class="room">상영관 1</p>
        <img class="poster" src="@/assets/클레멘타인.jpg" />
        <div class = "time">
          <div class = "btn_group" v-for="t in time1" v-bind:key="t">
              <button class = "btn" type='button' v-bind:id = "t" value = "non" @click = "push(1,t.value1)">{{t.value1}}<br><br>{{t.value2}}</button>
          </div>
        </div>
      </div>
      <div class="box">
        <p style="color : gray" class="room">상영관 2</p>
        <img class="poster" src="@/assets/영웅.jpg" />
        <div class = "time">
          <div class = "btn_group" v-for="t in time2" v-bind:key="t">
              <button class = "btn" type='button' v-bind:id = "t" value = "non" @click = "push(2,t.value1)">{{t.value1}}<br><br>{{t.value2}}</button>
          </div>
        </div>
      </div>
      <div class="box">
        <p style="color : gray" class="room">상영관 3</p>
        <img class="poster" src="@/assets/성냥팔이.jpg" />
        <div class = "time">
          <div class = "btn_group" v-for="t in time3" v-bind:key="t">
              <button class = "btn" type='button' v-bind:id = "t" value = "non" @click = "push(3,t.value1)">{{t.value1}}<br><br>{{t.value2}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from
import axios from "axios";

export default {
  data: () => ({
    movieinfos: [],
    time1 : [],
    time2 : [],
    time3 : [],
    movieName : [],

  }),
  created() {
    axios
      .get("http://localhost:8000/tsis-movie/movie")
      .then(({ data }) => {
        this.movieinfos = data;
        this.movieName = new Set();
        for(var i = 0;i< this.movieinfos.length;i++){//영화별 상영시간 받아오기 
            var value1;
            var value2;
            if(this.movieinfos[i].idMovie == 1) {
                value1 = this.movieinfos[i].timeMovie
                value2 = this.movieinfos[i].emptySeat+' / '+this.movieinfos[i].seatNum
                this.time1.push({value1,value2});
            }
            else if(this.movieinfos[i].idMovie == 2) {
                value1 = this.movieinfos[i].timeMovie
                value2 = this.movieinfos[i].emptySeat+' / '+this.movieinfos[i].seatNum
                this.time2.push({value1,value2});
            }
            else if(this.movieinfos[i].idMovie == 3) {
                value1 = this.movieinfos[i].timeMovie
                value2 = this.movieinfos[i].emptySeat+' / '+this.movieinfos[i].seatNum
                this.time3.push({value1,value2});
            }
            this.movieName.add(this.movieinfos[i].nameMovie);
        }
      });
  },
  methods: {
    push(id, time) {
        var name = Array.from(this.movieName);
        console.log(">>>>>>>>>>>>>>>",typeof(name[id-1]));

        this.$router.push({ name: "Seat", params: { movie: id, time : time, moviename:name[id-1]} });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.theater {
  display: grid;
  margin-top: -20px;
}

.tsis{
  color : #32AAFF;
  padding-bottom: 10px;
  border-bottom: solid 4px  #32AAFF;
}

.movie {
  width: 90%;
  margin: 10px auto;
  display: flex;
  margin-top: 60px;
}
.box {
  flex: 1;
  width: 30%;
  margin-top: -30px;
}

.time{
    margin:0 auto;
    display: flex;
    justify-content: center;
}

.btn_group button{
  margin-top: 10px;
  border: 3px solid skyblue;
  background-color: rgba(0, 0,0,0);
  color: skyblue;
  font-weight: bold;
  border-radius: 3px;
}

.btn_group button:hover{
  color: white;
  background-color: skyblue;
}

.btn{
    margin:0 auto;
    margin-left: -2px;
    text-align: center;
}

.poster {
  width: 320px;
  height: 450px;
  object-fit: cover;
}
.room{
  font-family : 'this_is_font_name';
  font-size:15px;
}
@font-face {
    font-family: 'this_is_font_name'; 
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff') format('woff');
    
     font-weight: normal; 
     font-style: normal;  
}
</style>
