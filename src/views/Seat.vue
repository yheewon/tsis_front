<template>
  <div class = "Seat">
    <div align="left" class = "tsis">Tsis</div>
    <div class = "theater">
      <div class = "screen">screen</div>
      <table class="seatTable">
        <tbody>
          <tr v-for="row in theater.theaterLine" :key="row">
            <td v-for="column in theater.theaterHor" :key="column">
              <button class = "btn" type='button' value="non" @click = "btnClick($event)"
                :disabled='checkDis(row, column)'>{{String.fromCharCode(row+64)}}{{column}}</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class = "choice" style="color : gray">선택좌석 : {{resSeat}}</div>
      <button class = "reservation" type = "button" @click="push()">예매</button>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name : 'Seat',
  props: {
    movie:{
      type : Number,
      default : 0
    },
    time : {
      type : String,
      default : '' 
    },
    moviename : {
      type : String,
      default : ''
    }
  },
  data: () => ({
    reserved : "",//예약된 좌석
    theater : [], // 극장 크기 + price
    s_reserved : [],//예약된 좌석 배열로 변환
    curr_theater :[], //현재 상영관 극장크기
    resPeople : 0,//예약 인원
    resSeat : "",//예약 좌석
    resPrice : 0//예약 가격
  }),
  created() {
    axios.get("http://localhost:8000/tsis-movie/getSeat",{
      params :{
        timeMovie : this.time
      }
    })
    .then(({ data }) => {
      this.reserved += data;
      this.checkSeat();
    });
    axios.get("http://localhost:8000/tsis-movie/getSize",{
      params : {
        idMovie : this.movie
      }
    })
    .then(({data})=>{
      this.theater = data[0];
    });
    
  },
  methods: {
    checkSeat(){
      var str = this.reserved.replace(',','/');
      console.log("바꾸기!!!!!!!!!!!!!!!!!!",str);

      var seperators = ['/',','];
      this.s_reserved = str.split(new RegExp(seperators.join('|'),'g'));
      console.log("이상해!!!!!!!!!!!!!!!!!!",this.s_reserved);
    },
    checkDis(row, column){
      const seat = String.fromCharCode(row+64)+''+column
      if (this.s_reserved.indexOf(seat) < 0) {
        return false
      }
      return true
    },
    checkId(row,column){
      return String.fromCharCode(row+64) + ""+column
    },
    btnClick(event){
      this.resSeat += event.target.innerText +"/"
      this.resPeople ++;
      this.resPrice = this.resPeople * this.theater.priceMovie
    },
    push(){
      this.$router.push({ name: "Reservation", params: { movie: this.movie, time : this.time, moviename :this.moviename,
                                                  people : this.resPeople, seat: this.resSeat.slice(0,-1), price: this.resPrice} });
    }
  }
};
</script>

<style scoped>
.Seat{
  display: grid;
}
.theater {
  display: grid;
  width: 500px;
  margin: 0 auto;
  margin-top: 50px;
}

.tsis{
  color : #32AAFF;
  padding-bottom: 10px;
  border-bottom: solid 4px  #32AAFF;
}


.screen{
  border: 2px solid skyblue;
  color : gray
  
}

.btn{
  object-fit: cover;
  width: 45px;
  background-color: rgb(231, 251, 255);
  border : rgb(220, 248, 253);
}

.btn:active{
  background-color: white;
}
.choice{
  margin-top: 10px;
}

.seatTable{
  display: grid;
  border: 2px solid skyblue;
}

.reservation{
  margin-top: 60px;
  border: 3px solid skyblue;
  background-color: rgba(0, 0,0,0);
  color: skyblue;
  border-radius: 3px;
}
</style>