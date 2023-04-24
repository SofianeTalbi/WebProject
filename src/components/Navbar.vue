<script>
import ParticipationStorageService from '/src/services/storage.js';

    export default {
        mounted() {
    this.fetchData();
    },
    methods:{
        async fetchData() {
        if (document.location.href === "http://localhost:5173/index") {
            document.getElementById("index").classList.add('active');
        }
        else {
            document.getElementById("index").classList.remove('active');
        }
        if (document.location.href === "http://localhost:5173/profile") {
            document.getElementById("profile").classList.add('active');
        }
        else {
            document.getElementById("profile").classList.remove('active');
        }
        if (document.location.href === "http://localhost:5173/about") {
            document.getElementById("about").classList.add('active');
        }
        else {
            document.getElementById("about").classList.remove('active');
        }
        if (document.location.href === "http://localhost:5173/contact") {
            document.getElementById("contact").classList.add('active');
        }
        else {
            document.getElementById("contact").classList.remove('active');
        }
        if (document.location.href === "http://localhost:5173/cevent") {
            document.getElementById("cevent").classList.add('active');
        }
        else {
            document.getElementById("cevent").classList.remove('active');
        }
        const token = ParticipationStorageService.getToken()
        if (token === null) {
            this.$router.push({
                name : "signon"
            });
        }
    },
        moveElt() {
        this.$refs.nav.classList.add('active');
        },
        moveEltInv() {
        this.$refs.nav.classList.remove('active');
        },
    }
    };
</script>

<template>
    <section id="header">
        <a href="#"><img src="../assets/img/logo.png" class="logo" alt=""></a>
        <div>
            <ul id="navbar" ref="nav">
                <li><RouterLink id="index" to="index" >Home</RouterLink></li>
                <li><RouterLink id="profile" to="profile" class="active">Profile</RouterLink></li>
                <li><RouterLink id="about" to="about">About</RouterLink></li>
                <li><RouterLink id="contact" to="contact">Contact</RouterLink></li>
                <li id="lg-calendar"><RouterLink id="cevent" to="cevent"><i class="fas fa-calendar-day"></i></RouterLink></li>
                <a id="close"><i class="fas fa-times" @click="moveEltInv"></i></a>
            </ul>
        </div>
        <div id="mobile">
            <RouterLink id="cevent" to="cevent"><i class="fas fa-calendar-day"></i></RouterLink>
            <i class="fas fa-outdent" @click="moveElt"></i>
        </div>
    </section>
</template>

<style scoped>
    #header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 80px;
        background: url(../assets/img/background.png);
        background-position: center;
        background-size: cover;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
        z-index: 999;
        position: sticky;
        top: 0;
        left: 0;
    }

    #navbar {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #navbar li {
        list-style: none;
        padding: 0 20px;
        position: relative;
    }

    #navbar li a {
        text-decoration: none;
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
        transition: 0.3s ease;
    }

    #navbar li a:hover,
    #navbar li a.active {
        color: #7C62D6;
    }

    #navbar li a.active::after,
    #navbar li a:hover::after {
        content: "";
        width: 30%;
        height: 2px;
        background-color: #7C62D6;
        position: absolute;
        bottom: -4px;
        left: 20px;
    }

    #mobile {
        display: none;
        align-items: center;
    }

    #close {
        display: none;
    }

    @media (max-width: 799px) {
        #navbar {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            position: fixed;
            top: 0;
            right: -300px;
            height: 100vh;
            width: 300px;
            background-color: #E3E6F3;
            box-shadow: 0 40px 60px rgba(0, 0, 0, 0.1);
            padding: 80px 0 0 10px;
            transition: 0.3s;
        }

        #navbar.active {
            right: 0px;
        }

        #navbar li {
            margin-bottom: 25px;
        }

        #mobile {
            display: flex;
            align-items: center;
        }

        #mobile i {
            color: #1a1a1a;
            font-size: 24px;
            padding-left: 20px;
        }

        #close {
            display: initial;
            position: absolute;
            top: 30px;
            left: 30px;
            color: #222;
            font-size: 24px;
        }

        #lg-calendar {
            display: none;
        }

        @media (max-width: 477px) {
            #header {
                padding: 10px 30px;
            }
        }

    }
</style>