<script>
import axios from "axios";
import ParticipationStorageService from '/src/services/storage.js';

export default {
data() {
    return {
    name: "",
    email:"",
    };
},
mounted() {
    this.fetchData();
},
methods: {
    async fetchData() {
            try {
                const email = ParticipationStorageService.getEmail() 
                const token = ParticipationStorageService.getToken()
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
                } catch (error) {
                    console.log(error);
                }

        
        
    }
}
};
</script>
  

<template>
    <section id="hero">
        <h4>Hello {{ name }} !</h4>
        <h2>Choose the event you want to attend !</h2>
        <h1>There is something for every taste</h1>
        <p>Otherwise, you can create your own event or search for a particular one by clicking below</p>
        <div class="createsearch">
            <RouterLink to="cevent"><button>Create now !</button></RouterLink>
            <RouterLink to="search"><button class="searchbutton"><i class="fas fa-search"></i></button></RouterLink>
        </div>
    </section>
</template>

<style scoped>
    #hero {
        height: 60vh;
        padding: 0 80px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    #hero h4 {
        padding-bottom: 15px;
    }

    #hero h1 {
        color: #7C62D6;
    }

    #hero button {
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

    #hero button:hover{
        color: #ffffff;
        background-color: #000000;
    }

    #hero button:active {
        transform: translateY(4px);
    }

    #hero .searchbutton {
        padding: 14px 17px ;
    }

    @media (max-width: 799px) {
        #hero {
            height: 70vh;
            padding: 0 80px;
            background-position: top 30% right 30%;
        }
    }

    @media (max-width: 477px) {
        #hero {
            padding: 0 20px;
            background-position: 55%;;
        }

        h1 {
            font-size: 38px;
        }

        h2 {
            font-size: 32px;
        }
        
    }   
</style>