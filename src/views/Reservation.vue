<template>
  <div class = "Reservation"> 
      <div align="left" class = "tsis">Tsis</div>
      <div class = "reserved">
        <p>예매 내역을 확인해주세요.</p>
        <p>상영관 : {{movie}}관</p>
        <p>상영 시간 : {{time}}</p>
        <p>상영작 : {{moviename}}</p>
        <p>예약 인원 : {{people}}</p>
        <p>예약 좌석 : {{seat}}</p>
        <p> 총 가격 : {{price}}</p>

      </div>
      <div class = "input">
        <p>핸드폰 번호를 입력해주세요.</p>
        <div class = "phone">
          <input type="text" v-model="phoneFirst"/>
          <p> - </p>
          <input type="text" v-model="phoneMiddle"/>
          <p> - </p>
          <input type="text" v-model="phoneLast"/>
          <button class =  "btn" type = "button" @click="insert()">예매</button>
        </div>
      </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name : 'Reservation',
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
    },
    people:{
        type: Number,
        default : 0
    },
    seat:{
        type: String,
        default : ''
    },
    price:{
        type: Number,
        default : 0
    }
  },
  data: () => ({
      phoneFirst:"",
      phoneMiddle:"",
      phoneLast:"",
  }),
  methods: {
    insert: function() {
        axios.post("http://localhost:8000/tsis-reservation/reservataion",{
      idReservation: "0",
      nameMovie: this.moviename,
      peopleReservation : this.people,
      phoneNum : this.phoneFirst+"-"+this.phoneMiddle+"-"+this.phoneLast,
      priceReservation : this.price,
      seatReservation : this.seat,
      idMovie : this.movie,
      timeMovie : this.time
      })
      .then(response => this.addedContact = response.data)
      .catch(function(error) {
      console.log(error);
      });
      this.update();
    },

    update: function(){
        axios.post("http://localhost:8000/tsis-reservation/emptyseat",{
          peopleReservation : this.people,
          timeMovie :this.time
        })
        .then(response => this.addedContact = response.data)
        .catch(function(error) {
        console.log(error);
        });
        this.reservation();
    },

    reservation(){
      alert("예매 되었습니다!!");

    }
  }
};
</script>

<style scoped>
.p{
  color: gray;
}

.Reservation{
    display: grid;
}
.tsis{
  color : #32AAFF;
  padding-bottom: 10px;
  border-bottom: solid 4px  #32AAFF;
}

.reserved{
    border: 3px solid skyblue;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 5px;
    width: 400px;
}

.input{
  display: grid;
  margin-top: 60px;
}

.phone{
  margin : 0 auto;
  justify-content: center;
  display: flex;
}
.phone > * {
  height: 1.2rem;
  margin: 0 0.3rem;
}

.btn{
  border: 3px solid skyblue;
  background-color: rgba(0, 0,0,0);
  color: skyblue;
  font-weight: bold;
  border-radius: 3px;
  height: 25px;
}
</style>
