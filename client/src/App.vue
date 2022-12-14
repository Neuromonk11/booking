<template>
  <div class="bg-background">
    <div class="flex flex-col min-h-screen px-20 max-w-7xl w-4/5 font-Poppins min-w-[320px] justify-center mx-auto bg-white max-[600px]:px-5">
      <span class="mt-4 mb-4 pl-2">22.12.2022</span>
      <h1 class="text-xl3">Lecture on the topic "Profession IT-specialist"</h1>
        <div class="pl-2">
          <div class="flex flex-col mt-4">
          <p class="w-4/5 min-w-[260px]">
            For those who are interested in information technology, Microsoft together with Google will organize a lecture "Profession: IT Specialist", which will be held on November 29, 2012 at 19.00 Moscow time. At the lecture, you will learn how the IT service works in a large company, why everyone goes to the cloud, what IT specialists are currently needed, and who is an IT broker. The lecture will be led by Alexander Markovich, IT Director at Google, and Evgeniy Gradov, Microsoft System Administrator.
          </p>
        </div>
          <img class="mt-4 w-8/12 min-w-[280px]" :src="Lecture"/>
      </div>
      <div class="mt-6 w-10/12 ">
        <h2 class="mt-6 mb-2 text-xl2">Speakers</h2>
        <div class="flex mt-5  pl-2  w-7/12 justify-between min-w-[300px]">
            <div class="flex flex-col justify-between">
              <h3>Alexander Markovich from <span>Google</span></h3>
              <img class="w-28 h-28 mt-6 transition-all duration-300 hover:scale-110" :src="Google"/>
            </div>
            <div class="flex flex-col justify-between">
              <h3>Evgeny Gradov from <span>Microsoft</span></h3>
              <img class="w-28 h-28 mt-6 transition-all duration-300 hover:scale-110" :src="Microsoft"/>
            </div>
        </div> 
      </div>
      <div class="mt-6 w-10/12">
        <h2 class="mt-6 mb-2 text-xl2">When?</h2>
        <div class="flex flex-wrap  items-start">
          <button v-for="item in items" :key="item.dates" 
            class="text-white mt-7 bg-primary py-1 px-6 ml-2 w-1/5 min-w-[260px] transition-all duration-300 hover:bg-secondary" 
            @click="toggleModal(item.datetime)">{{ item.date }}
          </button>
        </div>
      </div>          
        <div class="w-2/3 mt-6 ">
          <h2 class="my-6 text-xl2">Where?</h2>
          <p class="pl-2 font-normal min-w-[300px]">SEASONS shopping center, Kutuzovsky prospect, 48<br/>
            3rd floor, right wing</p>
          <div class="left-0 mt-4 pl-2 pb-4 w-full min-w-[280px]"> 
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10648.95213989146!2d17.1102346!3d48.144216!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfedababc603112d0!2sTourist%20Information%20Centre%20-%20Old%20Town!5e0!3m2!1sru!2s!4v1671033008817!5m2!1sru!2s" 
              width="100%" height="300" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" referrerpolicy="no-referrer-when-downgrade">
            </iframe> 
          </div>
    
      </div>
      <Modal         
          :modalActive="modalActive"
          @close-modal="toggleModal"
          @send-data="submit"
        >
          <div class="text-black flex flex-col">
            <input class="mt-4 p-1 border border-slate-200" 
              v-model="userInfo.name" placeholder="Enter your name" />
            <input class="mt-4 p-1 border border-slate-200" 
              v-model="userInfo.email" placeholder="Enter your email" />
            <input class="mt-4 p-1 border border-slate-200" 
              v-model="userInfo.phone" placeholder="Enter your phone" />
          </div>
          <div class="flex flex-wrap mt-4">
            <div @click="selectSeat(seat.seat, $event)" v-for="seat in seats" :key="seat.seat" class="flex flex-col justify-center items-center align-middle w-[calc(10%-0.5rem)] m-1 h-12 max-[768px]:m-0.5 max-[768px]:w-[calc(10%-0.25rem)]"  :style="[seat.reserdedDates.length === 0 ?  {background: '#90ee90'}  : seat.reserdedDates.length === 1 ? {background: 'rgb(153, 196, 153)'} : seat.reserdedDates.length === 2 ? {background: 'rgb(120, 179, 120)'} : {background: '#808080'}]">
              <div 
                v-for="date in seat.reserdedDates" 
                class="text-xs max-[768px]:text-sm pointer-events-none"
                :style="[seat.available ?  {color: 'black'} : {color: 'white'}]"> {{ date }} </div>
            </div>
          </div>
          <p class="mt-4">*Dates that are already occupied are visible on the display of places</p>
      </Modal>

    </div>
  </div>

</template>


<script>
import Google from "./assets/google.png"
import Microsoft from "./assets/microsoft.png"

import Lecture from "./assets/lecture.jpg"


import Modal from './components/Modal.vue'
import axios from 'axios'
export default {
  data()  {
    return {
      Google: Google,
      Microsoft: Microsoft,
      items: [
        { date: 'December 27, 19:00', datetime: '27/12' },
        { date: '3 January 2023', datetime: '3/01' },
        { date: '6 January 2023', datetime: '6/01' },
      ],
      
    }
  },
}

</script>

<script setup>
import { ref } from "vue";
let userInfo = {
  name: '',
  email: '',
  phone: '',
}
let datetime = ''
let selectedSeat = 0
const modalActive = ref(false);
let seats = ref([])
axios.get('http://localhost:8080/get_list')
      .then(res => {
        console.log(res.data.seats)
        seats.value = res.data.seats
        console.log('seats ', seats._rawValue)
      })
      .catch(error => {
        console.log(error)
      })

const toggleModal = (date) => {
  datetime = date
  modalActive.value = !modalActive.value;
};
const submit = () => {
  if(datetime) axios.post('http://localhost:8080/book_seat', {userInfo: userInfo, seat: selectedSeat, datetime: datetime})
    .then(res => {
      if(res.data) { 
        seats.value = res.data.seats
        modalActive.value = !modalActive.value
      }else alert('Место уже занято')
    })
    .catch(error => {
      console.log(error)
    })
}
const selectSeat = (index, e) => {
  console.log(seats._rawValue)
  if(seats._rawValue[index-1].available){

    for(let x=0; x<e.target.parentNode.children.length; x++) {
      console.log(seats._rawValue[x].reserdedDates.length)
      if(seats._rawValue[x].reserdedDates.length === 0) e.target.parentNode.children[x].style.background = '#90ee90'
      else if (seats._rawValue[x].reserdedDates.length === 1) e.target.parentNode.children[x].style.background = 'rgb(153, 196, 153)'
      else if (seats._rawValue[x].reserdedDates.length === 2 ) e.target.parentNode.children[x].style.background = 'rgb(120, 179, 120)'
    }
    selectedSeat = index-1
    e.target.style.background = 'yellow'
  }
}
</script>