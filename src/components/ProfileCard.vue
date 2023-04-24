<script>
import axios from "axios";
import ParticipationStorageService from '/src/services/storage.js';

export default {
data() {
    return {
    id : null,
    name: "",
    last_name: "",
    token:"",
    email:"",
    avg_score:"",
    num_comments: "",
    percentage_commenters_below: "",
    emails:""
    };
},
mounted() {
    this.fetchData();
    this.fetchDatatwo();
},
methods: {
    async fetchData() {
    try {
        const token = ParticipationStorageService.getToken() 
        const email = ParticipationStorageService.getEmail() 
        const response = await axios.get(
        "http://puigmal.salle.url.edu/api/v2/users/search?s="+email,
        {
            headers: {
            Authorization:
                "Bearer "+ token
            }
        }
        );
        this.name = response.data[0].name;
        const name = response.data[0].name;
        this.last_name = response.data[0].last_name;
        const last_name = response.data[0].last_name;
        this.emails = response.data[0].email;
        const emails = response.data[0].email;
        this.image = response.data[0].image;
        const image = response.data[0].image;
        const id = response.data[0].id;
        ParticipationStorageService.saveName(name)
        ParticipationStorageService.saveLast_name(last_name)
        ParticipationStorageService.saveImage(image)
        ParticipationStorageService.saveId(id)
    } catch (error) {
        console.log(error);
    }
    },
    async fetchDatatwo() {
    try {
        const token = ParticipationStorageService.getToken() 
        const id = ParticipationStorageService.getId()
        const responsetwo = await axios.get(
        "http://puigmal.salle.url.edu/api/v2/users/"+ id + "/statistics",
        {
            headers: {
            Authorization:
                "Bearer "+ token
            }
        }
        );
        this.avg_score = responsetwo.data[0].avg_score;
        this.num_comments = responsetwo.data[0].num_comments;
        this.percentage_commenters_below = responsetwo.data[0].percentage_commenters_below;
        if (this.avg_score === null) {
            this.avg_score = "--"
        }
        if (this.percentage_commenters_below === null) {
            this.percentage_commenters_below = "--"
        } else {
            this.percentage_commenters_below = this.percentage_commenters_below + "%"
        }
    } catch (error) {
        console.log(error);
    }
    },
    async Popup() {
    popup.classList.add("open-popup")
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        })   
    },
    async Removepop() {
    popup.classList.remove("open-popup")
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        })   
    },
    async Deltok() {
        window.localStorage.clear();
        },
    async DeleteA() {
    try {
        const token = ParticipationStorageService.getToken() 
        await axios.delete(
        "http://puigmal.salle.url.edu/api/v2/users",
        {
            headers: {
            Authorization:
                "Bearer "+ token
            }
        }
        );
     
    } catch (error) {
        console.log(error);
    }
    },
}
};
</script>

<template>
    <section id="profile" class="section-p1">
        <div class="profile-card">
            <h1>{{ name }}</h1>
            <div>{{ name }} {{ last_name }}, {{ emails }}</div>
            <div class="event-img">
                <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="" />
            </div>
            <div class="profile-card-info">
                <div>
                    <div><h1>{{ avg_score }}</h1></div>
                    <div class="data">Average score</div>
                </div>
                <div>
                    <div><h1>{{ percentage_commenters_below }}</h1></div>
                    <div class="data">User with less comments</div>
                </div>
                <div>
                    <div><h1>{{ num_comments }}</h1></div>
                    <div class="data">Total comments</div>
                </div>
            </div>

            <div class="profile-card-button">
                <RouterLink to="/"><button @click="Deltok">Sign out</button></RouterLink>
                <RouterLink to="modify"><button>Add/modify date</button></RouterLink>
                <button @click="Popup">Delete account</button>
                <div class="popup" id="popup">
                <img src="https://i0.wp.com/netjapan.hk/wp-content/uploads/2018/12/Green-Tick-PNG-Pic-1.png?resize=300%2C246&ssl=1">
                <h2>Warning</h2>
                <p>Are you sure you want to delete your account ?</p>
                <RouterLink to="/"><button @click="DeleteA" type="button">Yes</button></RouterLink>
                <button @click="Removepop" type="button">No</button>
            </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
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
    .event-img {
        padding: 30px 0px 0px;
    }
    .event-img img{
        width: 15%;
        background-color: #ffffff;
        border-radius: 50%;
        padding: 10px;
    }

    #profile {
        display: flex;
        justify-content: center;
        text-align: center;
        padding: 110px 0px;
    }

    #profile .profile-card {
        width: 40%;
        height: 476px;
        border-radius: 30px;
        border: 1px solid #cce7d0;
        transition: 0.2s ease;
        background-color: rgba(255, 255, 255, 0.2);
        border-style: solid;
        border-color: rgba(255, 255, 255, 0.5);
        border-width: 2px;
        box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.2);
        padding-top: 10px;

    }

    #profile .profile-card-info {
        display: flex;
        justify-content: center;
        padding-left: 12px;

    }

    #profile .profile-card-info div {
        padding: 0px 15px;
    }

    #profile .profile-card-button {
        padding-top: 30px;
    }

    #profile button {
        font-weight: bold;
        background-color: #7C62D6;
        border-radius: 30px;
        border: none;
        cursor: pointer;
        outline: none;
        transition: 0.3s ease;
        padding: 14px ;
        font-size: 15px;
        margin: 5px;
        box-shadow: 0px 0px 10px #999;
        width: 220px;
    }

    #profile button:hover{
        color: #ffffff;
        background-color: #000000;
    }

    #profile button:active {
        transform: translateY(4px);
    }

    @media (max-width: 799px) {
        #profile {
            padding: 257px 0px;
        }
        #profile .profile-card {
            width: 75%;
            height: 405px;
        }
    }

    @media (max-width: 477px) {

        #profile {
            padding: 170px 0px;
        }
        #profile .profile-card {
            width: 85%;
            height: 385px;
        }

        #profile h1 {
            font-size: 30px;
        }

        #profile .data {
            font-size: 10px;
        }

        #profile .profile-card-button {
            padding-top: 0px;
        }

        #profile button {
            padding: 14px 10px ;
            font-size: 10px;
            margin: 5px;
            width: 120px;
        }
    }


</style>