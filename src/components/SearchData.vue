<script>
import EventsSearch from '../components/EventsSearch.vue'


export default {
  components: {
    EventsSearch,
  },
  data() {
    return {
      eventName: '',
      eventLocation: ''
    }
  },
  methods: {
    handleSearchClick() {
      this.$refs.bComponent.fetchData({
        eventName: this.eventName,
        eventLocation: this.eventLocation
    });
    }
  }
};
</script>

<template>
    <section id="search" class="section-p1">
        <h1>You can search for a particular event !</h1>
        <form action="#">
            <div class="field event name">
                <div class="input-area">
                    <input type="text" v-model="eventName" placeholder="Event name">
                    <i class="icon fas fa-heading"></i>
                </div>
            </div>
            <div class="field event location">
                <div class="input-area">
                    <input type="text" v-model="eventLocation" placeholder="Event location">
                    <i class="icon fas fa-bolt"></i>
                </div>
            </div>
        </form>
        <div class="searchbutton">
      <button @click="handleSearchClick"><i class="fas fa-search"></i></button>
    </div>
    <EventsSearch :eventName="eventName" :eventLocation="eventLocation" ref="bComponent" />
  </section>
</template>

<style scoped>
    #search h1 {
        color: #7C62D6;
        padding-top: 40px;
        padding-bottom: 100px;
    }

    #search form {
        display: flex;
        justify-content: center;
    }

    #search form .field .input-area{
        height: 50px;
        position: relative;
        padding: 0px 10px;
    }
    
    #search form input{
        height: 100%;
        outline: none;
        padding: 0 45px;
        font-size: 18px;
        caret-color: #7C62D6;
        border-radius: 30px;
        border: 1px solid #000000;
        transition: all 0.2s ease;
    }
    
    #search form .field input:focus {
        border-color: #7C62D6;
    }

    #search .field .input-area i {
        position: absolute;
        top: 50%;
        font-size: 18px;
        pointer-events: none;
        transform: translateY(-50%);
    }
    
    #search .input-area .icon {
        left: 27px;
        color: #bfbfbf;
        transition: color 0.2s ease;
    }

    #search form input:focus ~ .icon {
        color: #7C62D6;
    }
    
    #search form input::placeholder{
        color: #bfbfbf;
        font-size: 17px;
    }

    #search .searchbutton {
        text-align: center;
        padding-top: 20px;
    }

    #search button {
        font-weight: bold;
        background-color: #7C62D6;
        border-radius: 30px;
        border: none;
        cursor: pointer;
        outline: none;
        transition: 0.3s ease;
        padding: 14px 17px ;
        font-size: 15px;
        margin: 5px;
        box-shadow: 0px 0px 10px #999;
    }

    #search button:hover{
        color: #ffffff;
        background-color: #000000;
    }

    #search button:active {
        transform: translateY(4px);
    }

    @media (max-width: 799px) {
        #search {
            height: 40vh;
        }

        #search h1 {
            padding:40px 0 60px;
        }

        #search form input{
            width: 100%;
        }

        #search form .field .input-area{
        padding: 0px 10px;
        }

        #search .input-area .icon {
            left: 25px;
        }
    }

    @media (max-width: 477px) {
        #search {
            height: 50vh;
        }

        #search h1 {
            padding: 40px 0px 25px 0px;
            line-height: normal;
            font-size: 30px;
        }

        #search form {
            flex-direction: column;
            justify-content: center;
        }
        
        #search form .field {
            margin-bottom: 15px;
        }

        #search form .field .input-area {
            height: 40px;
        }
        
        #search form input{
            font-size: 15px;
        }

        #search .field .input-area i {
            font-size: 15px;
        }
        
        #search form input::placeholder{
            font-size: 14px;
        }

        #search .searchbutton {
            padding-top: 10px;
        }
    }
</style>