<script>
import ParticipationStorageService from '/src/services/storage.js';
import quizApiService from '/src/services/api.js';

export default {
    data(){
        return {
            email : "",
            password : "",
            showErrorMsg : false,
        };
    },
     methods : {
        async Connect() {
            var response = await quizApiService.postLogin({
                    "email" : this.email,
                    "password" : this.password
                });
            const status = response.status;
            if (status === 404){
                this.showErrorMsg = true;
            }
            else {
                const token = response.data["accessToken"];
                const email = this.email;
                ParticipationStorageService.saveToken(token);
                ParticipationStorageService.saveEmail(email)
                this.$router.push({
                    name : "index"
                });
            }
        }
    }
}
</script>

<template>
    <div class="logo">
        <img src="../assets/img/logo.png">
    </div>
    <section id="signon">
        <div id="wrapper" class="wrapper">
            <h1>Sign On</h1>
            <form action="#">
            <div class="field email">
                <div class="input-area">
                    <input type="text" v-model="email" placeholder="Email Address">
                    <i class="icon fas fa-envelope"></i>
                </div>
            </div>
            <div class="field password">
                <div class="input-area">
                    <input type="password" v-model="password" placeholder="Password">
                    <i class="icon fas fa-lock"></i>
                </div>
            </div>
            <div class="errormessage" v-if="showErrorMsg">
                <i style="padding-right:10px;" class="icon fas fa-exclamation-circle"></i>
                Incorrect password or email address
            </div>
            <div class="loginbutton">
                <button type="button" @click="Connect">Login</button>
            </div>
            </form>
            <div class="line-3">
                <hr>
            </div>
            <div class="sign-txt">
                Don't have an account ? <RouterLink to="signup">Sign up</RouterLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .logo {
        text-align: center;
        margin-top: 60px;
    }

    #signon {
        width: 100%;
        height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #signon .wrapper {
        background: rgb(255, 255, 255);
        height: 425px;
        width: 500px;
        padding: 25px 20px 10px 20px;
        border-radius: 50px;
        box-shadow: 10px 10px 15px rgba(0,0,0,0.1);
    }

    #signon .wrapper h1 {
        padding: 10px 0px 20px;
    }

    #signon form .field {
        height: 45px;
        width: 100%;
        margin-bottom: 20px;
    }

    #signon form .field input:focus {
        border-color: #7C62D6;
    }

    #signon form .field .input-area{
        height: 50px;
        width: 100%;
        position: relative;
    }

    #signon .field .input-area i {
        position: absolute;
        top: 50%;
        font-size: 18px;
        pointer-events: none;
        transform: translateY(-50%);
    }
    
    #signon form input{
        width: 100%;
        height: 100%;
        outline: none;
        padding: 0 45px;
        font-size: 18px;
        caret-color: #7C62D6;
        border-radius: 30px;
        border: 1px solid #000000;
        transition: all 0.2s ease;
    }
    
    #signon .input-area .icon {
        left: 15px;
        color: #bfbfbf;
        transition: color 0.2s ease;
    }

    #signon form input:focus ~ .icon {
        color: #7C62D6;
    }
    
    #signon form input::placeholder{
        color: #bfbfbf;
        font-size: 17px;
    }

    #signon form .loginbutton {
        text-align: center;
    }

    #signon form .errormessage {
        color: red;
    }

    #signon form button {
        width: 100%;
        height: 50px;
        border-radius: 30px;
        margin-top: 25px;
        color: #000000;
        font-weight: bold;
        border: none;
        background: #7C62D6;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0px 0px 10px #999;
    }

    #signon form button:hover{
        background: black;
        color: white;
    }

    #signon .line-3 {
        padding: 20px 0px 15px 0px;
        color: #7C62D6;
    }

    #signon .sign-txt {
        justify-content: center;
        display: flex;
        font-size: smaller;
    }
    #signon .wrapper a{
        color: #7C62D6;
        font-weight: bold;
        text-decoration: none;
        transition: all 0.3s ease;
        padding-left: 4px;
    }

    #signon .wrapper a:hover{
        color: black;
    }

    @media (max-width: 799px) {
        .logo {
            margin-top: 120px;
        }

        #signon {
            height: 55vh;
        }
    }

    @media (max-width: 477px) {
    #signon .wrapper {
            width: 350px;
            height: 320px;
            padding: 10px 30px 0px;
        }

    #signon .wrapper h1 {
            padding: 0px 0px 0px 0px;
            font-size: 30px;
        }
    
    #signon form .field {
            margin-bottom: 15px;
        }

    #signon form .field .input-area {
            height: 40px;
        }
    
    #signon form input{
            font-size: 15px;
        }

    #signon .field .input-area i {
            font-size: 15px;
        }
    
    #signon form input::placeholder{
            font-size: 14px;
        }

    #signon form button {
            margin-top: 10px;
            font-size: smaller;
            height: 35px;
        }
    }

</style>