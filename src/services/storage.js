export default {
      clear() {
            // todo : implement
      },
      savePlayerName(playerName) {
            window.localStorage.setItem("playerName", playerName);
      },
      getPlayerName() {		
            return window.localStorage.getItem("playerName");
      },
      saveParticipationScore(participationScore) {
        window.localStorage.setItem("participationScore", participationScore);
      },
      getParticipationScore() {
        return window.localStorage.getItem("participationScore");
      },
      saveSize(size) {
            window.localStorage.setItem("size", size);
      },
      getSize() {
            return window.localStorage.getItem("size");
      },
      saveToken(token) {
            window.localStorage.setItem("token", token);
      },
      getToken() {
            return window.localStorage.getItem("token");
      },
      saveId(id) {
            window.localStorage.setItem("id", id);
      },
      getId() {
            return window.localStorage.getItem("id");
      },
      saveName(name) {
            window.localStorage.setItem("name", name);
      },
      getName() {
            return window.localStorage.getItem("name");
      },      
      saveLast_name(last_name) {
            window.localStorage.setItem("last_name", last_name);
      },
      getLast_name() {
            return window.localStorage.getItem("last_name");
      },      
      saveImage(image) {
            window.localStorage.setItem("image", image);
      },
      getImage() {
            return window.localStorage.getItem("image");
      },
      saveDate(){
            const currentDate = new Date();
            const dateString = currentDate.toLocaleString("fr-FR",{
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                  });
            window.localStorage.setItem("date",dateString);
      },
      parseDate(dateString) {
            const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2}):(\d{2})/;
            const dateParts = dateRegex.exec(dateString);
          
            if (!dateParts) {
              return null;
            }
          
            const day = parseInt(dateParts[1], 10);
            const month = parseInt(dateParts[2], 10) - 1; // Zero-indexed months
            const year = parseInt(dateParts[3], 10);
            const hour = parseInt(dateParts[4], 10);
            const minute = parseInt(dateParts[5], 10);
            const second = parseInt(dateParts[6], 10);
          
            return new Date(year, month, day, hour, minute, second);
      },
      checkIsValid(){
            try {
                  const specificDate = window.localStorage.getItem("date");
                  const currentDate = new Date();
                  const specificTimeInMilliseconds = this.parseDate(specificDate).getTime();
                  const currentTimeInMilliseconds = currentDate.getTime();     
                  
                  const timeDifferenceInMilliseconds = currentTimeInMilliseconds - specificTimeInMilliseconds;
                  const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);
                  if (timeDifferenceInHours >= 1) {
                        console.log("Le token est périmé ",timeDifferenceInMilliseconds);
                        return false;
                  } else {
                        console.log("Le token est valide ",timeDifferenceInMilliseconds);
                        return true;
                  }
            }
            catch (error){
                  return false;
            }
            
      },
      saveEmail(email) {
            window.localStorage.setItem("email", email);
      },
      getEmail(){
            return window.localStorage.getItem("email");
      },
      saveId(Id) {
            window.localStorage.setItem("Id", Id);
      },
      getId(){
            return window.localStorage.getItem("Id");
      },
      logOut(){
            window.localStorage.removeItem("date");
            window.localStorage.removeItem("token");
      }
    };