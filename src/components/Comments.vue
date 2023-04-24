<script>
import axios from "axios";
import ParticipationStorageService from '/src/services/storage.js';

export default {
    data() {
        return {
            comments: [],
            mark: null,
            contentcomm:"",
            token:"",
            id:"",
            email:"",
            showErrorMsgC : false,
            showErrorMsgE : true,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
        try {
            const token = ParticipationStorageService.getToken()
            const id = ParticipationStorageService.getId() 
            axios.defaults.headers['Authorization'] = 'Bearer ' + token
            const response = await axios.get(
                "http://puigmal.salle.url.edu/api/v2/events/"+id+"/assistances",
                {
                    headers: {
                    Authorization:
                        "Bearer "+ token
                    }
                }
            );
            this.comments = response.data;
            const email = ParticipationStorageService.getEmail()
            axios.defaults.headers['Authorization'] = 'Bearer ' + token
            const responsed = await axios.get(
                "http://puigmal.salle.url.edu/api/v2/users/search?s="+email,
                {
                    headers: {
                    Authorization:
                        "Bearer "+ token
                    }
                }
            );
            this.email = responsed.data[0].email;
                if (this.comments.length === 0) {
                    this.showErrorMsgC = true;
                    this.showErrorMsgE = false;
                }
                else {
                    for (let i = 0; i < this.comments.length; i++) {
                        if (this.comments[i].email === this.email) {
                            this.showErrorMsgC = false;
                            this.showErrorMsgE = true;
                            break
                        }
                        else {
                            this.showErrorMsgC = true;
                            this.showErrorMsgE = false;
                        }
                    }
                }
        }
            catch (error) {
                console.log(error);
            }
        },
        async Comment() {
            if (0 <= this.mark && this.mark <= 10) {            
                const token = ParticipationStorageService.getToken()
                const id = ParticipationStorageService.getId() 
                axios.defaults.headers['Authorization'] = 'Bearer ' + token
                await axios.post(
                    "http://puigmal.salle.url.edu/api/v2/events/"+id+"/assistances",
                    {
                        headers: {
                        Authorization:
                            "Bearer "+ token
                        }
                    }
                )
                await axios.put(
                    "http://puigmal.salle.url.edu/api/v2/events/"+id+"/assistances",
                    {
                    "puntuation": this.mark,
                    "comentary": this.contentcomm,
                    }
                )
                location.reload();
        }
        else {
            console.log(this.mark)
        }
        },
        async Edit() {
            if (0 <= this.mark && this.mark <= 10) {            
                const token = ParticipationStorageService.getToken()
                const id = ParticipationStorageService.getId() 
                axios.defaults.headers['Authorization'] = 'Bearer ' + token
                await axios.put(
                    "http://puigmal.salle.url.edu/api/v2/events/"+id+"/assistances",
                    {
                    "puntuation": this.mark,
                    "comentary": this.contentcomm,
                    }
                )
                location.reload();
        }
        else {
            console.log(this.mark)
        }
        },
        async Delete() {
        try {
            const token = ParticipationStorageService.getToken()
            const id = ParticipationStorageService.getId() 
            axios.defaults.headers['Authorization'] = 'Bearer ' + token
            await axios.delete(
                "http://puigmal.salle.url.edu/api/v2/events/"+id+"/assistances",
                {
                    headers: {
                    Authorization:
                        "Bearer "+ token
                    }
                }
            )
            location.reload();
        }
            catch (error) {
                console.log(error);
            }
        },
    }
};
</script>

<template>
    <section id="comments1">
        <h4>Comments</h4>
        <div class="comment1" v-for="comment in comments" >
            <div class="namepuntuation">
                <div class="name">
                    {{ comment.name }}
                    <span>({{ comment.email }})</span>
                </div>
                <div class="puntuation">
                    {{ comment.puntuation }}/10
                </div>
            </div>
            <div class="line-1"></div>
            <div class="commentary">
                {{ comment.comentary }}
            </div>
            <div class="deletebutton" v-if="comment.email == email ">
                <button type="button" @click="Delete"><i class="fas fa-times"></i></button>
            </div>
        </div>
    </section>

    <section id="comments">

        <h4>Leave a comment</h4>
            <div class="commentsect">
                <textarea v-model="contentcomm" class="comment"></textarea>
                <div class="optioncom">
                    <div class="markinp">
                        <input type="number" v-model="mark" min="0" max="10" > <span>Give a score between 0 and 10</span>
                    </div>
                    <div class="comedit">
                        <button v-if="showErrorMsgC" class="combutton" type="button" @click="Comment">Comment</button>
                        <button v-if="showErrorMsgE" class="editbutton" type="button" @click="Edit" >Edit Comment</button>
                    </div>
                </div>
            </div>
    </section>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
    #comments1 .name span {
        color: gray;
        font-size: smaller;
    }
    #comments .markinp span {
        color: grey;
        font-size: smaller;
    }
    #comments .markinp input {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 0px;
        text-align: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        border-style: solid;
        border-color: rgba(255, 255, 255, 0.5);
        border-width: 2px;
    }

    #comments .editbutton {
        background: #d0bb00;
        border: none;
        padding: 10px;
        border-radius: 30px;
        cursor: pointer;
        font-weight: bold;
        transition: 0.3s ease;
        box-shadow: 0px 0px 10px #999;
    }
    #comments .combutton {
        background: green;
        border: none;
        padding: 10px;
        margin-right: 10px;
        border-radius: 30px;
        cursor: pointer;
        font-weight: bold;
        transition: 0.3s ease;
        box-shadow: 0px 0px 10px #999;
    }

    #comments .editbutton:hover{
        background-color: yellow;
    }

    #comments .editbutton:active {
        transform: translateY(4px);
    }

    #comments .combutton:hover{
        background-color: #31d000;
    }

    #comments .combutton:active {
        transform: translateY(4px);
    }

    #comments .optioncom {
        padding-left: 10px;
    }
    #comments .commentsect {
        display: flex;
    }
    #comments .comedit {
        padding-top: 20px;
        display: flex;
    }
    #comments1 .deletebutton {
        text-align: right;
        padding-right: 10px;
    }

    #comments1 .deletebutton button {
        background-color: transparent;
        color: red;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;
        border: 1px solid red;
        transition: 0.3s ease;
        box-shadow: 0px 0px 10px #999;
    }

    #comments1 .deletebutton button:hover {
        background-color: red;
        color: white;
    }

    #comments1 .deletebutton button:active {
        transform: translateY(4px);
    }
    #comments1 .namepuntuation {
        display: flex;
        justify-content: space-between;
    }

    #comments1 .commentary {
        padding: 10px;
    }
    .line-1 {
    height: 1px;
    background: black;
    }
    #comments1 {
        padding: 0px 80px;
    }
    #comments1 .comment1 {
        margin: auto;
        width: 50%;
        margin-bottom: 20px;
        width: 60%;
        height: 100px;
        padding:10px;
        border: 1px solid #cce7d0;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 30px;
        border-style: solid;
        border-color: rgba(255, 255, 255, 0.5);
        border-width: 2px;
      }

    #comments1 h4 {
        padding: 20px 0 20px 0;
    }

    #comments {
        padding: 0px 80px 80px;
    }
    #comments .comment {
        width: 40%;
        height: 100px;
        padding: 20px;
        border: 1px solid #cce7d0;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 30px;
        border-style: solid;
        border-color: rgba(255, 255, 255, 0.5);
        border-width: 2px;
        resize:none
      }

    #comments h4 {
        padding: 20px 0 20px 0;
    }

    @media (max-width: 799px) {
        #comments {
            padding: 0px 80px 117px;
        }
        #comments .comment {
            width: 91%;
        }

        #comments1 {
            padding: 0px 80px 117px;
        }
        #comments1 .comment1 {
            width: 91%;
        }
    }

    @media (max-width: 477px) {
        #comments {
            padding: 0px 20px 70px;
        }
        #comments .comment {
            width: 83%;
        }

        #comments1 {
            padding: 0px 20px 70px;
        }
        #comments1 .comment1 {
            width: 83%;
        }
    }
</style>
