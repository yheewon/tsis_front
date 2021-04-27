<template>
  <div>
      <div align="left" class = "tsis">Tsis</div>
      <router-link tag = "div" class = "btn" to="/home">영화 예매하기</router-link>
      <br>
      <router-link tag = "div" class = "btn" to="/ckreservation">예매내역 확인</router-link>
  </div>
  
</template>

<style scoped>
.tsis{
  color : #32AAFF;
  padding-bottom: 10px;
  border-bottom: solid 4px  #32AAFF;
}

.btn{
  text-decoration: none;
  border: 1px solid skyblue;
  background-color: rgba(0, 0,0,0);
  color: skyblue;
  padding: 5px;
  width: 300px;
  border-radius: 5px;
  margin:0 auto;
  margin-top: 30px;
}
.btn:hover{
  color: white;
  background-color: skyblue;
}
</style>