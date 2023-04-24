<script>
import axios from "axios";
import ParticipationStorageService from '/src/services/storage.js';

export default {
    data() {
        return {
            image:"",
            date: "",
            location: "",
            name: "",
            n_participators: "",
            description: "",
            token:"",
            id:"",
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        scrollToTop() {
            window.scrollTo({
                top:0,
                behavior: "smooth"
            });
        },
        async fetchData() {
        try {
            const token = ParticipationStorageService.getToken() 
            const id = ParticipationStorageService.getId() 
            const response = await axios.get(
                "http://puigmal.salle.url.edu/api/v2/events/"+id,
                {
                    headers: {
                    Authorization:
                        "Bearer "+ token
                    }
                }
            );
            this.image = response.data[0].image;
            this.date = response.data[0].date.substring(0, 10).replace(/-/g, "/");
            this.location = response.data[0].location;
            this.name = response.data[0].name;
            this.n_participators = response.data[0].n_participators;
            this.description = response.data[0].description;
            this.scrollToTop()
        }
            catch (error) {
                console.log(error);
            }
        },
        getImageUrl(imageUrl) {
            if (imageUrl.startsWith("http")) {
                return imageUrl;
            } else {
                return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";
            }
        },
    }
};
</script>

<template>
    <section id="eventdetails" class="section-p1">
        <div class="single-event-image">
            <img :src="getImageUrl(image)" style="width:100%;" id="MainImg" alt="">
        </div>
        <div class="single-event-details">
            <h6>{{ date }}</h6>
            <h4>{{ location }}</h4>
            <h2>{{ name }}</h2>
            <button>Participate</button> <part>{{ n_participators }} participants maximum</part>
            <h4>Event Details</h4>
            <span>{{ description }}</span>
        </div>
    </section>
</template>

<style scoped>
    #eventdetails .single-event-details part {
        color: gray;
        font-size: smaller;
    }
    #eventdetails {
        display: flex;
        margin-top: 20px;
    }
    #eventdetails .single-event-image {
        width: 40%;
        margin-right: 50px;
    }

    #eventdetails .single-event-image img{
        border-radius: 30px;
    }

    #eventdetails .single-event-details {
        width: 50%;
        padding-top: 30px;
    }

    #eventdetails .single-event-details h4 {
        padding: 20px 0 20px 0;
    }

    #eventdetails .single-event-details h2 {
        font-size: 26px;
        color: #7C62D6;
    }

    #eventdetails .single-event-details button {
        font-weight: bold;
        background-color: #7C62D6;
        border-radius: 30px;
        border: none;
        cursor: pointer;
        outline: none;
        transition: 0.3s ease;
        padding: 14px 40px ;
        font-size: 15px;
        margin: 5px;
        box-shadow: 0px 0px 10px #999;
    }

    #eventdetails .single-event-details button:hover{
        color: #ffffff;
        background-color: #000000;
    }

    #eventdetails .single-event-details button:active {
        transform: translateY(4px);
    }

    #eventdetails .single-event-details span {
        line-height:25px;
    }

    @media (max-width: 799px) {
        #eventdetails .single-event-image {
            margin: 30px 50px 0px 0px;
        }
    }

    @media (max-width: 477px) {
        #eventdetails {
            display: flex;
            flex-direction: column;
        }

        #eventdetails .single-event-image {
            width: 100%;
            margin-right: 0px;
        }

        #eventdetails .single-event-details {
            width: 100%;
        }

        #eventdetails .single-event-details button {
        margin: 0px 88.13px;
        }

        #eventdetails .single-event-details .rate {
        margin: 0px 122.6px;
        }
    }
</style>