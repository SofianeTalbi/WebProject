<template>
    <section id="about-head" class="section-p1">
        <img src="../assets/img/about/Esiee.jpg" alt="">
        <div>
            <h2>Who I am ?</h2>
            <p>My name is Sofiane Talbi, I am 22 years old and I am in master 2 at ESIEE Paris, a French engineering school in which I specialized
            in artificial intelligence and datascience. As part of my studies, I had the chance to do an Erasmus at La Salle Ramon Lull University 
            where I took courses in computer science.<br><br> For the Web Project course, I had to create this social network on which it is 
            possible to create an account, search for events, create them, participate in them and comment on them.
            </p>
            <abbr title="">
                This site was made with HTML, CSS and JavaScript with Vue.js + Vite
            </abbr>
            <br><br>
            <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">
                I would like to thank La Salle Ramon Lull University for hosting me during my ERASMUS.
            </marquee>
        </div>
    </section>
</template>

<style scoped>
    #about-head {
        display: flex;
        align-items: center;
    }

    #about-head img {
        width: 50%;
        height: auto;
    }

    #about-head div {
        padding-left: 40px;
    }

    @media (max-width:477px) {
        #about-head {
        flex-direction: column;
        text-align: center;
        }

        #about-head img {
        width: 100%;
        margin-bottom: 20px;
        }

        #about-head div {
        padding-left: 0px;
        }
    }
</style>