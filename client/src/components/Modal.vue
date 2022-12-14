<template>
    <Teleport to="body">
      <Transition name="modal-outer">
        <div
            v-show="modalActive"
            class="fixed w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center  px-8 z-20"
        >
          <Transition name="modal-inner">
            <div
                v-if="modalActive"
                class="flex flex-col p-4 bg-white self-start mt-32 w-3/5 max-w-screen-md min-w-[320px]"
            >
            <button
                class="text-white bg-primary py-2 px-4 self-end transition-all duration-300 hover:bg-secondary"
                @click="$emit('close-modal')"
              >&#10005;
            </button>
              <slot />
              <button
                class="text-white bg-primary mt-6 mb-2 py-2 px-4 self-center transition-all duration-300 hover:bg-secondary" 
                @click="$emit('send-data')"
              >Book your seat
            </button>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </template>
  
  <script setup>
    import axios from 'axios'

    defineEmits(["close-modal", "send-data"]);
    defineProps({
        modalActive: {
          type: Boolean,
          default: false,
        },
    });

    function bookSeat(){
        alert(userInfo)
        // axios.post('http://localhost:3000/book_seat', {
        //     "name": "test",
        //     "email": "" })
        //     .then(function (response) {
        //       console.log(response);
        //     })
    }
  </script>
  
  <style scoped>
  .modal-outer-enter-active,
  .modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  .modal-outer-enter-from,
  .modal-outer-leave-to {
    opacity: 0;
  }
  .modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }
  .modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }
  .modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }
  .modal-inner-leave-to {
    transform: scale(0.8);
  }
  </style>