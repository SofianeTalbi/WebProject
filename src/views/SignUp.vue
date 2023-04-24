<script>
import axios from "axios";

export default {
    data(){
        return {
            name:"",
            last_name:"",
            email : "",
            password : "",
            confirmpassword: "",
            image: "",
            showErrorMsg : false,
            showErrorMsgtwo : false,
            errormessage: "",
        }
    },
    methods : {
        async Create() {
            if (this.password === this.confirmpassword) {
                try {
                    await axios.post(
                        "http://puigmal.salle.url.edu/api/v2/users",
                        {
                        "name" : this.name,
                        "last_name" : this.last_name,
                        "email" : this.email,
                        "password" : this.password,
                        "image" : this.image
                        }
                    )
                    this.showErrorMsg = false;
                    this.showErrorMsgtwo = false;
                    popup.classList.add("open-popup")
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })    
                    }
                catch (error) {
                    this.showErrorMsg = true;
                    this.showErrorMsgtwo = false;
                    if (error.response.data.stackTrace.sqlMessage === "Duplicate entry '" + this.email + "' for key 'email_UNIQUE'") {
                        this.errormessage = "There is already an account linked to this email address"
                    }
                    this.errormessage = error.response.data.stackTrace.details[0].message
                }
            }
            else {
                this.showErrorMsg = false;
                this.showErrorMsgtwo = true;
            }
        },
    }
}
</script>

<template>
    <section id="signup">
        <div id="wrapper" class="wrapper">
            <h1>Sign Up</h1>
            <form action="#">
            <div class="field name">
                <div class="input-area">
                    <input type="text" v-model="name" placeholder="Name">
                    <i class="icon fas fa-user"></i>
                </div>
            </div>
            <div class="field last name">
                <div class="input-area">
                    <input type="text" v-model="last_name" placeholder="Last Name">
                    <i class="icon fas fa-user"></i>
                </div>
            </div>
            <div class="field email">
                <div class="input-area">
                    <input type="text" v-model="email" placeholder="Email Address">
                    <i class="icon fas fa-envelope"></i>
                </div>
            </div>
            <div class="field image">
                <div class="input-area">
                    <input type="text" v-model="image" placeholder="Image Path">
                    <i class="icon fas fa-image"></i>
                </div>
            </div>
            <div class="field password">
                <div class="input-area">
                    <input type="password" v-model="password" placeholder="Password">
                    <i class="icon fas fa-lock"></i>
                </div>
            </div>
            <div class="field confirm password">
                <div class="input-area">
                    <input type="password" v-model="confirmpassword" placeholder="Confirm Password">
                    <i class="icon fas fa-lock"></i>
                </div>
            </div>
            <div class="errormessage" v-if="showErrorMsg">
                <i style="padding-right:10px;" class="icon fas fa-exclamation-circle"></i>
                {{ errormessage }}
            </div>

            <div class="errormessage" v-if="showErrorMsgtwo">
                <i style="padding-right:10px;" class="icon fas fa-exclamation-circle"></i>
                password are not the same
            </div>
            <div class="loginbutton">
                <button type="button" @click="Create">Create account</button>
                <div class="popup" id="popup">
                <img src="https://i0.wp.com/netjapan.hk/wp-content/uploads/2018/12/Green-Tick-PNG-Pic-1.png?resize=300%2C246&ssl=1">
                <h2>Congratulation !</h2>
                <p>Your account has been created</p>
                <RouterLink to="/"><button type="button">Ok</button></RouterLink>
                </div>
            </div>
            </form>
            <div class="line-3">
                <hr>
            </div>
            <div class="sign-txt">
                Already have an account ? <RouterLink to="/">Sign on</RouterLink>
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

    #signup {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #signup .wrapper {
        background: rgb(255, 255, 255);
        height: 680px;
        width: 500px;
        padding: 15px 20px;
        border-radius: 50px;
        box-shadow: 10px 10px 15px rgba(0,0,0,0.1);
    }

    #signup .wrapper h1 {
        padding: 10px 0px 20px;
    }

    #signup form .field {
        height: 45px;
        width: 100%;
        margin-bottom: 20px;
    }

    #signup form .field .input-area{
        height: 50px;
        width: 100%;
        position: relative;
    }
    
    #signup form input{
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
    
    #signup form .field input:focus {
        border-color: #7C62D6;
    }

    #signup .field .input-area i {
        position: absolute;
        top: 50%;
        font-size: 18px;
        pointer-events: none;
        transform: translateY(-50%);
    }
    
    #signup .input-area .icon {
        left: 15px;
        color: #bfbfbf;
        transition: color 0.2s ease;
    }

    #signup form input:focus ~ .icon {
        color: #7C62D6;
    }
    
    #signup form input::placeholder{
        color: #bfbfbf;
        font-size: 17px;
    }

    #signup form .loginbutton {
        text-align: center;
    }

    #signup form .errormessage {
        color: red;
    }

    #signup form button {
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

    #signup form button:hover{
        background: black;
        color: white;
    }

    #signup .line-3 {
        padding: 20px 0px 15px 0px;
        color: #7C62D6;
    }

    #signup .sign-txt {
        justify-content: center;
        display: flex;
        font-size: smaller;
    }
    #signup .wrapper a{
        color: #7C62D6;
        font-weight: bold;
        text-decoration: none;
        transition: all 0.3s ease;
        padding-left: 4px;
    }

    #signup .wrapper a:hover{
        color: black;
    }

    @media (max-width: 799px) {
        #signup {
            height: 100vh;
        }
    }

    @media (max-width: 477px) {
        #signup .wrapper {
            width: 350px;
            height: 620px;
            padding: 10px 30px 0px;
        }

        #signup .wrapper h1 {
            padding: 0px 0px 0px 0px;
            font-size: 30px;
        }
        
        #signup form .field {
            margin-bottom: 15px;
        }

        #signup form .field .input-area {
            height: 40px;
        }
        
        #signup form input{
            font-size: 15px;
        }

        #signup .field .input-area i {
            font-size: 15px;
        }
        
        #signup form input::placeholder{
            font-size: 14px;
        }

        #signon form button {
            margin-top: 10px;
            font-size: smaller;
            height: 35px;
        }
    }
</style>