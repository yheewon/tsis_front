<template>
  <div class = "Check"> 
      <div align="left" class = "tsis">Tsis</div>
      <div class = "input">
        <p>핸드폰 번호를 입력해주세요.</p>
        <div class = "phone">
          <input type="text" v-model="phoneFirst"/>
          <p> - </p>
          <input type="text" v-model="phoneMiddle"/>
          <p> - </p>
          <input type="text" v-model="phoneLast"/>
          <button class =  "btn" type = "button" @click="insert()">예매 확인</button>
        </div>
      </div>
      <div class = "reserved">
        <p>예매 내역을 확인해주세요.</p>
        <p>상영관 : {{id}}관</p>
        <p>상영 시간 : {{time}}</p>
        <p>상영작 : {{name}}</p>
        <p>예약 인원 : {{people}}</p>
        <p>예약 좌석 : {{seat}}</p>
        <p> 총 가격 : {{price}}</p>
      </div>

  </div>
</template>

<script>

import axios from "axios";

export default {
  data: () => ({
    reserved : [],//예약내역
    phoneFirst:"",
    phoneMiddle:"",
    phoneLast:"",
    id : 0,
    time : "",
    name : "",
    people : 0,
    seat : "",
    price : 0
  }),
  methods: {
    insert(){
      this.select();
      this.id = this.reserved[0].idMovie;
      this.time = this.reserved[0].timeMovie;
      this.name = this.reserved[0].nameMovie;
      this.people = this.reserved[0].peopleReservation;
      this.seat = this.reserved[0].seatReservation;
      this.price = this.reserved[0].priceReservation;

    },
    select : function(){
      axios.get("http://localhost:8000/tsis-reservation/checkreservation",{
        params :{
          phoneNum : this.phoneFirst+"-"+this.phoneMiddle+"-"+this.phoneLast
        }
      })
      .then(({data}) => {
        this.reserved = data;
      })

    }
  }
};
</script>

<style scoped>
.Check{
    display: grid;
}
.tsis{
  color : #32AAFF;
  padding-bottom: 10px;
  border-bottom: solid 4px  #32AAFF;
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

.reserved{
    border: 3px solid skyblue;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 5px;
    width: 400px;
}
</style>
