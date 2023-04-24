<script>
import axios from "axios";
import ParticipationStorageService from '/src/services/storage.js';
import { format } from 'date-fns';

export default {
    data() {
            return {
            events: [],
            token: "",
            currentPage: 1,
            eventsPerPage: 16,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const token = ParticipationStorageService.getToken() 
                const response = await axios.get(
                    "http://puigmal.salle.url.edu/api/v2/events/",{
                        headers: {
                            Authorization: "Bearer "+ token
                        }
                    }
                );
                this.events = response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        async orderTrue() {
            try {
                const token = ParticipationStorageService.getToken() 
                const response = await axios.get(
                    "http://puigmal.salle.url.edu/api/v2/events/best",{
                        headers: {
                            Authorization: "Bearer "+ token
                        }
                    }
                );
                this.events = response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        scrollToTop() {
            window.scrollTo({
                top: 450,
                behavior: "smooth"
            });
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return format(date, 'yyyy/MM/dd');
        },
        formatScore(score) {
            if (score === null) {
                return 'Not rated';
            }
            const parsedScore = parseFloat(score);
            return parsedScore.toFixed(1);
        },
        getImageUrl(imageUrl) {
            if (imageUrl.startsWith("http")) {
                return imageUrl;
            } else {
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
            }
        },
        goToEventDetails(eventId) {
            this.$router.push({ name: 'sevent', params: { id: eventId } });
            ParticipationStorageService.saveId(eventId);
        }
    },
    computed: {
        paginatedEvents() {
            const startIndex = (this.currentPage - 1) * this.eventsPerPage;
            const endIndex = startIndex + this.eventsPerPage;
            return this.events.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.events.length / this.eventsPerPage);
        },
    },
};
</script>

<template>
    <section id="events" class="section-p1">
      <h2>Available events</h2>
      <p>Click on the events for more details</p>
      <div class="buttons">
        <p style="margin-top: 10px;">Sort events by event-creator rating ?</p>
        <button @click="orderTrue">Yes</button>
        <button @click="fetchData">No</button>
    </div>
      <div class="event">
        <div class="eve" v-for="event in paginatedEvents" :key="event.id" @click="goToEventDetails(event.id)">
            <img :src="getImageUrl(event.image)" alt="" class="event-img" />
            <div class="des">
              <span>{{ formatDate(event.date) }}</span>
              <h4>{{ event.name }}</h4>
              <h5>{{ event.location }}</h5>
            </div>
            <div class="likescore">
              {{ formatScore(event.avg_score) }}
              <i class="fas fa-heart"></i>
            </div>
        </div>
      </div>
    </section>

    <section id="pagination" class="section-p1">
        <a v-for="page in totalPages" :key="page" :href="'#' + page" @click.prevent="currentPage = page; scrollToTop()" v-bind:class="{ 'current': page === currentPage }">{{ page }}</a>
        <a href="#" v-if="currentPage < totalPages" @click.prevent="currentPage += 1; scrollToTop()"><i class="fas fa-long-arrow-alt-right"></i></a>
    </section>
</template>

<style scoped>
  .buttons {
  display: flex;
  width: 490px;
  gap: 10px;
  --b: 4px;   /* the border thickness */
  --h: 1.8em; /* the height */
  margin-left: 68% ;
}

.buttons button {
  --_c: #7C62D6;
  flex: calc(1.25 + var(--_s,0));
  min-width: 0;
  font-size: 20px;
  font-weight: bold;
  height: var(--h);
  cursor: pointer;
  color: var(--_c);
  border: var(--b) solid var(--_c);
  background: 
    conic-gradient(at calc(100% - 1.3*var(--b)) 0,var(--_c) 209deg, #0000 211deg) 
    border-box;
  clip-path: polygon(0 0,100% 0,calc(100% - 0.577*var(--h)) 100%,0 100%);
  padding: 0 calc(0.288*var(--h)) 0 0;
  margin: 0 calc(-0.288*var(--h)) 0 0;
  box-sizing: border-box;
  transition: flex .4s;
}
.buttons button + button {
  --_c: #000000;
  flex: calc(.75 + var(--_s,0));
  background: 
    conic-gradient(from -90deg at calc(1.3*var(--b)) 100%,var(--_c) 119deg, #0000 121deg) 
    border-box;
  clip-path: polygon(calc(0.577*var(--h)) 0,100% 0,100% 100%,0 100%);
  margin: 0 0 0 calc(-0.288*var(--h));
  padding: 0 0 0 calc(0.288*var(--h));
}
.buttons button:focus-visible {
  outline-offset: calc(-2*var(--b));
  outline: calc(var(--b)/2) solid #000;
  background: none;
  clip-path: none;
  margin: 0;
  padding: 0;
}
.buttons button:focus-visible + button {
  background: none;
  clip-path: none;
  margin: 0;
  padding: 0;
}
.buttons button:has(+ button:focus-visible) {
  background: none;
  clip-path: none;
  margin: 0;
  padding: 0;
}
button:hover,
button:active:not(:focus-visible) {
  --_s: .75;
}
button:active {
  box-shadow: inset 0 0 0 100vmax var(--_c);
  color: #fff;
}


    #events {
        text-align: center;
    }

    #events .event {
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        flex-wrap: wrap;
    }
    #events .eve {
        width: 23%;
        min-width: 250px;
        padding: 10px 12px;
        border: 1px solid #cce7d0;
        cursor: pointer;
        margin: 15px 0;
        transition: 0.2s ease;
        position: relative;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 30px;
        border-style: solid;
        border-color: rgba(255, 255, 255, 0.5);
        border-width: 2px;
    }

    #events .event-link {
        text-decoration: none;
    }

    #events .eve:hover {
        box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
    }

    #events .eve img {
        width: 100%;
        border-radius: 20px;
    }

    #events .eve .des {
        text-align: start;
        padding: 10px 0;
    }

    #events .eve .des span {
        color: #606063;
        font-size: 12px;
    }

    #events .eve .des h5 {
        padding-top: 7px;
        color: #1a1a1a;
        font-size: 14px;
    }

    #events .eve .des h4 {
        padding-top: 7px;
        font-size: 15px;
        font-weight: 700;
        color: #7C62D6;
    }

    #events .event-img{
        height: 300px;
    }

    #events .likescore {
        text-align : right;
        color: red;
        padding-right: 10px;
    }

    #pagination {
        text-align: center;
    }

    #pagination a {
        text-decoration: none;
        background-color: #7C62D6;
        padding: 15px 20px;
        border-radius: 4px;
        font-weight: bold;
        color: #000000;
        margin: 2px;
        cursor: pointer;
        transition: 0.3s ease;
        font-size: 15px;
        box-shadow: 0px 0px 10px #999;
    }

    #pagination a:hover{
        color: #ffffff;
        background-color: #000000;
    }

    #pagination a.current {
        background-color: #000000;
        color: #fff;
    }

    #pagination a i {
        font-size: 16px;
        font-weight: 600;
    }

    @media (max-width: 799px) {
        #events .event {
            justify-content: center;
        }

        #events .eve {
            margin: 15px;
        }

        .buttons {
            margin-left: 30% ;
        }
    }

    @media (max-width: 477px) {
        #events .eve {
            width: 100%;
        }

        .buttons {
            width: 360px;
            margin-left: -2% ;
        }
    }
</style>