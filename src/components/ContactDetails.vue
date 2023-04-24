<template>
    <section id="contact-details" class="section-p1">
        <div class="details">
            <span>GET IN TOUCH</span>
            <h2>Here is where my host university is located</h2>
            <h3>Location</h3>
            <div>
                <li>
                    <i class="far fa-map"></i>
                    <p>Carrer de Sant Joan de la Salle, 42, 08022 Barcelona</p>
                </li>
                <li>
                    <i class="far fa-envelope"></i>
                    <p>sofiane.talbi@edu.esiee.fr</p>
                </li>
                <li>
                    <i class="fas fa-phone-alt"></i>
                    <p>+33 7 67 51 32 65</p>
                </li>
                <li>
                    <i class="far fa-clock"></i>
                    <p>9:00am - 17:00pm - Mon - Fri</p>
                </li>
            </div>
        </div>
        <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.420683386583!2d2.1300643!3d41.4083858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49816d2174de3%3A0xdf19845b9ce0e77d!2sC%2F%20de%20Sant%20Joan%20de%20la%20Salle%2C%2042%2C%2008022%20Barcelona!5e0!3m2!1sfr!2ses!4v1674583028844!5m2!1sfr!2ses" 
            width="600" height="450" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </section>
</template>

<style scoped>
    #contact-details {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 8% ;
    }

    #contact-details .details {
        width: 40%;
        padding: 20px;
        border: 1px solid #cce7d0;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 30px;
        border-style: solid;
        border-color: rgba(255, 255, 255, 0.5);
        border-width: 2px;
    }

    #contact-details .details span {
        font-size: 12px;
    }

    #contact-details .details h2 {
        font-size: 26px;
        line-height: 35px;
        padding: 20px 0;
    }

    #contact-details .details h3 {
        font-size: 16px;
        padding-bottom: 15px;
    }

    #contact-details .details li {
        list-style: none;
        display: flex;
        padding: 10px 0;
    }

    #contact-details .details li i {
        font-size: 14px;
        padding-right: 22px;
    }

    #contact-details .details li p {
        margin: 0;
        font-size: 14px;
    }

    #contact-details .map {
        width: 55%;
        height: 400px;
    }

    #contact-details .map iframe {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 477px) {
        #contact-details {
            flex-direction: column;
        }

        #contact-details .details {
            width: 100%;
            margin-bottom: 30px;
        }

        #contact-details .map {
            width: 100%;
        }
    }

    @media (max-width: 799px) {
        #contact-details {
            flex-direction: column;
            padding-top: 80px;
        }

        #contact-details .details {
            width: 90%;
            margin-bottom: 20px;
        }

        #contact-details .map {
            width: 80%;
        }
    }
</style>