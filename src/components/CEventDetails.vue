<script>
import axios from "axios";
import ParticipationStorageService from '/src/services/storage.js';

export default {
    data() {
        return {
            name:"",
            image:"",
            latitude:"",
            longitude:"",
            location:"",
            description:"", 
            eventStart_date:"", 
            eventEnd_date:"", 
            n_participators:null,
            type:"",
            token:"",
            showErrorMsg : false,
            errormessage: "",
        };
    },
    methods: {
        async Create() {
            const token = ParticipationStorageService.getToken()
            axios.defaults.headers['Authorization'] = 'Bearer ' + token
            try {
                await axios.post(
                    "http://puigmal.salle.url.edu/api/v2/events",
                    {
                    "name":this.name,
                    "image":this.image,
                    "latitude":this.latitude,
                    "longitude":this.longitude,
                    "location":this.location,
                    "description":this.description, 
                    "eventStart_date":this.eventStart_date, 
                    "eventEnd_date":this.eventEnd_date, 
                    "n_participators":this.n_participators,
                    "type":this.type
                    }
                )
                popup.classList.add("open-popup")
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })
            }
            catch (error) {
                this.showErrorMsg = true;
                if (typeof this.latitude === 'string' || typeof this.longitude === 'string') {
                    this.errormessage = "'latitude' and 'longitude' must not be empty and must be integers"
                }
                this.errormessage = error.response.data.details[0].message
            }
        },
    }
};
</script>

<template>
    <section id="eventdetails" class="section-p1">
        <div class="single-event-image">
            <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" style="width:100%;" id="MainImg" alt="">
            <div class="centered"><input v-model="image" type="text" placeholder="Add the image address"></div>
        </div>
        <div class="single-event-details">
            <div class="date">
                <input v-model="latitude" type="text" placeholder="Add latitude">
            </div>
            <div class="date">
                <input v-model="longitude" type="text" placeholder="Add longitude">
            </div>
            <div class="date">
                <input v-model="eventStart_date" type="text" placeholder="Add eventStart_date"><h6>(YYYY/mm/dd)</h6>
            </div>
            <div class="date">
                <input v-model="eventEnd_date" type="text" placeholder="Add eventEnd_date"><h6>(YYYY/mm/dd)</h6>
            </div>
            <div class="date">
                <input v-model="n_participators" type="number" placeholder="Add n_participators">
            </div>
            <div class="date">
                <input v-model="type" type="text" placeholder="Add type">
            </div>
            <div class="location">
                <input v-model="location" type="text" placeholder="Add location">
            </div>
            <div class="title">
                <input v-model="name" type="text" placeholder="Add name">
            </div>
            <br>
            <br>
            <h4>Event Details</h4>
            <div class="description">
                <textarea v-model="description" placeholder="Add description"></textarea>
            </div>
            <br>
            <br>
            <div class="errormessage" v-if="showErrorMsg">
                <i style="padding-right:10px;" class="icon fas fa-exclamation-circle"></i>
                {{ errormessage }}
            </div>
            <button id="createbutton" @click="Create">Create</button>
            <div class="popup" id="popup">
                <img src="https://i0.wp.com/netjapan.hk/wp-content/uploads/2018/12/Green-Tick-PNG-Pic-1.png?resize=300%2C246&ssl=1">
                <h2>Thank You !</h2>
                <p>Your event has been successfully created. Thanks !</p>
                <RouterLink to="index"><button type="button">OK</button></RouterLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .errormessage {
        color: red;
    }

    .popup {
        width: 400px;
        background: #fff;
        border-radius: 6px;
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.1);
        text-align: center;
        padding: 0 30px 30px;
        color: #333;
        visibility: hidden;
        transition: transform 0.4s, top 0.4s;
    }

    .popup img {
        width: 100px;
        margin-top: -50px;
        border-radius: 50%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .popup h2 {
        font-size: 38px;
        font-weight: 500;
        margin: 30px 0 10px;
    }

    .popup button {
        width: 100%;
        margin-top: 50px;
        padding: 10px 0;
        background: #7C62D6;
        color: #fff;
        border: 0;
        outline: none;
        font-size: 18px;
        border-radius: 4px;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }

    .open-popup {
        visibility: visible;
        top: 50%;
        transform: translate(-50%, -50%) scale(1);
    }


    h6 {
        font-size: 10px;
        font-weight:300;
    }

    #eventdetails {
        display: flex;
        margin: 61px 0px;
    }
    #eventdetails .single-event-image {
        width: 40%;
        margin-right: 50px;
        position: relative;
        text-align: center;
    }

    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #eventdetails .single-event-image img{
        border-radius: 30px;
    }

    #eventdetails .single-event-details {
        width: 50%;
        padding-top: 30px;
    }

    #eventdetails .single-event-details input,
    .centered input {
        background-color: transparent;
        border: none;
        outline: none;
        caret-color: #7C62D6;
    }

    #eventdetails .single-event-details .date input,
    .centered input {
        font-weight: 700;
        font-size: 12px;
        width: 100%;
    }

    .centered input {
        text-align: center;
    }

    #eventdetails .single-event-details .location input {
        font-size: 20px;
        color: #222;
        font-weight: bold;
        padding: 20px 0 20px 0;
        width: 100%;
    }

    #eventdetails .single-event-details .title input {
        font-size: 26px;
        line-height: 54px;
        color: #222;
        font-weight: bold;
        color: #7C62D6;
        width: 100%;
    }

    #eventdetails .single-event-details textarea {
        background-color: transparent;
        border: none;
        outline: none;
        line-height: 25px;
        width: 97%;
        height: 100%;
        padding: 20px 0px;
        resize:none;
        font-weight:425;
        font-size: 15.6px
    }

    #eventdetails .single-event-details #createbutton {
        font-weight: bold;
        background-color: #7C62D6;
        border-radius: 30px;
        border: none;
        cursor: pointer;
        outline: none;
        transition: 0.3s ease;
        padding: 14px 40px ;
        font-size: 15px;
        margin: 5px 5px 0px 550px;
        box-shadow: 0px 0px 10px #999;
    }

    #eventdetails .single-event-details #createbutton:hover{
        color: #ffffff;
        background-color: #000000;
    }

    #eventdetails .single-event-details #createbutton:active {
        transform: translateY(4px);
    }

    @media (max-width: 799px) {
        #eventdetails .single-event-image {
            margin: 30px 50px 0px 0px;
        }

        #eventdetails .single-event-details #createbutton {
            margin: 5px 5px 0px 110px;
        }
    }

    @media (max-width: 477px) {
        #eventdetails {
            display: flex;
            flex-direction: column;
            margin: 11px 0px 45px;
        }


        #eventdetails .single-event-image {
            width: 100%;
            margin-right: 0px;
        }

        #eventdetails .single-event-details {
            width: 100%;
        }

        #eventdetails .single-event-details button {
        margin: 0px 103.295px;
        }

        #eventdetails .single-event-details .rate {
        margin: 0px 122.6px;
        }
    }
</style>