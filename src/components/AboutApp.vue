<template>
    <section id="about-app" class="section-p1">
        <h1>My Host University</h1>
        <div class="video">
            <video autoplay muted loop src="../assets/img/about/LaSalle.mp4"></video>
        </div>
    </section>
</template>

<style scoped>
    #about-app {
        text-align: center;
    }

    #about-app .video {
        width: 70%;
        height: 100%;
        margin: 30px auto 0 auto;
    }

    #about-app .video video {
        width: 100%;
        height: 100%;
        border-radius: 20px;
    }

    @media (max-width:477px) {
        #about-app .video {
        width: 100%;
        }
    }
</style>