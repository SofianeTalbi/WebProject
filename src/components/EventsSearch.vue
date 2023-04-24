<script>
import axios from "axios";
import ParticipationStorageService from '/src/services/storage.js';
import { format, isThisSecond } from 'date-fns';

export default {
    props: {
        eventName: {
        type: String,
        default: ''
        },
        eventLocation: {
        type: String,
        default: ''
        }
    },
    data() {
            return {
            events: [],
            token: "",
            currentPage: 1,
            eventsPerPage: 16,
            isEvent : false,
            noEvent : false,
        };
    },
    methods: {
        async fetchData() {
            try {
                const token = ParticipationStorageService.getToken() 
                const response = await axios.get(
                    "http://puigmal.salle.url.edu/api/v2/events/search?location="+ this.eventLocation + "&keyword=" + this.eventName ,{
                        headers: {
                            Authorization: "Bearer "+ token
                        }
                    }
                );
                this.events = response.data;
                if (this.events.length > 0) {
                    this.isEvent = true;
                    this.noEvent = false;
                }
                else {
                    this.isEvent = false;
                    this.noEvent = true;
                }
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
  pageNumbers() {
    const maxPage = Math.min(this.totalPages, 4);
    const middlePage = Math.min(Math.max(this.currentPage, 2), this.totalPages - 1);
    const firstPage = Math.max(1, middlePage - 1);
    const lastPage = Math.min(firstPage + 2, this.totalPages);
    const pages = [];
    for (let i = firstPage; i <= lastPage; i++) {
      pages.push(i);
    }
    return pages;
  },
},

};
</script>

<template>
    <section id="events" class="section-p1">
      <h2 v-if="isEvent">Available events</h2>
      <p v-if="isEvent">Click on the events for more details</p>
      <p v-if="noEvent">No event matches your search</p>
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
        <a href="#" v-if="currentPage > 1" @click.prevent="currentPage -= 1; scrollToTop()"><i class="fas fa-long-arrow-alt-left"></i></a>
        <a v-for="pageNumber in pageNumbers" :key="pageNumber" :href="'#' + pageNumber" @click.prevent="currentPage = pageNumber; scrollToTop()" v-bind:class="{ 'current': pageNumber === currentPage }">{{ pageNumber }}</a>
        <a href="#" v-if="currentPage < totalPages" @click.prevent="currentPage += 1; scrollToTop()"><i class="fas fa-long-arrow-alt-right"></i></a>
    </section>
</template>

  

<style scoped>
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
    }

    @media (max-width: 477px) {
        #events .eve {
            width: 100%;
        }
    }
</style>