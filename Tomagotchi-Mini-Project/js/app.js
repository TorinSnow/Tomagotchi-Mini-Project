let busy = false;
let seconds = 0;

//syncs with a "real clock" to increase the game a tick.
//tick will 
const TIME_PER_TICK = 5;
let timeBegin = 0;
let tickInterval;

class Tomagotchi {
    constructor(name, age) {
        this.bear = $('.bear')
        this.mood = "",
        this.foodStat = 0;
        this.restStat = 0;
        this.playStat = 0;
        this.age = age;
        this.name = name;
        this.alive = true;
    }

    //play() function, play with gotchi
    play = () => {
        console.warn('clicked play!')
        if (this.playStat > 2) {
            this.playStat--;
            this.bear.removeClass("worried").removeClass("sad").addClass("play");
            //this.bear.classList.add('.bear.play');
            //this.bear.animate('.play');
        } else if (!busy) {
            //$(".play").animate;
            busy = true;
            this.playStat--;
        }
    }


    // //feed() function, feed gotchi
    feed = () => {
        console.warn('clicked feed!')
        if (this.foodStat > 2) {
            this.foodStat--;
             //this.bear.classList.add('.bear.play');
        }
    }


    //sleep() function, put gotchi to sleep
    sleep = () => {
        console.warn('clicked sleep!')
        if (this.restStat > 2) {
            this.restStat--;
             //this.bear.classList.add('.rest .mouth');
        }
    }


    dead = () => {
        if(!this.alive){
            this.alive = false;
            clearInterval(tickInterval)
        }
        alert(`You Killed! ${this.name}`); // add clearinterval inside of other page set property on tomagotchi clas
    }

    isGotchiDead = () => {
        // create a new class property (inside constructor) call this.alive (boolean, defaults to true)
        // if any of the stats are over 10,
        // set this.alive to false
        // inside of tick()
        // check if gotchi.alive is true
        // if not, clearInterval(tickInterval)
        if (this.playStat >= 10 || this.foodStat >= 10 || this.restStat >= 10) {
            this.alive = false;
            this.dead();
        }
    }

    //name the gotchi
    nameGotchi = (name) => {
        this.name = name;
    }
}

$(document).ready(() => {
    console.warn('READY');
    const gotchi = new Tomagotchi('Gotchi', 1);

    $form = $("<form></form>");
    $form.append('<input type = "text" placeholder = "What is the tamagotchi named?" id = "gotchiname"> <button id="submit" type="submit">Name Me!?</button>');
    $('body').append($form);

    $('form').on('submit', (e) => {
        e.preventDefault();
        const inputValue = $('#gotchiname').val();
        gotchi.nameGotchi(inputValue);
        $('#gotchiname').val();
        $('form').remove();
        meterRefresh();
    });

    //keep track of the stats and track the progress
    const makeMeter = () => {
        console.log('makeMeter');
        $('.stat-meters').append(`<div class="meterList"><p>${gotchi.name}s status</p><ul id="meters"></ul></div>`);
        meter();
    }
    // create the lil meter
    const meter = () => {
        console.log('called meter')
        $('.meterList').append(`<li>Hunger: ${gotchi.foodStat}</li><li>Sleepy: ${gotchi.restStat}</li><li>Happiness: ${gotchi.playStat}</li><li>Age: ${gotchi.age}</li>`);
    }

    // refresh the meters
    const meterRefresh = () => {
        console.log('meterRefresh');
        $('.meterList').remove();
        makeMeter();
    }

    const tick = () => {
        console.warn('seconds: ', seconds);
        if (seconds % 10 === 0) {
            gotchi.foodStat++;
        } else if (gotchi.foodStat === 10) {
            gotchi.isGotchiDead();
            meterRefresh();
        }
        if (seconds % 15 === 0) {
            gotchi.restStat++;
        } else if (gotchi.restStat === 10) {
            gotchi.isGotchiDead();
            meterRefresh();
        }
        if (seconds % 20 === 0) {
            gotchi.playStat++;
        } else if (gotchi.playStat === 0) {
            gotchi.isGotchiDead();
            meterRefresh();
        }
        if (seconds % 50 === 0) {
            gotchi.age++;
        } else if (gotchi.age === 100) {
            gotchi.isGotchiDead();
            meterRefresh();
        }
        seconds = seconds + 5;
    }
    //timer
    const tickCheck = () => {
        const timeNow = (new Date()).getTime();
        console.log('timeNow: ', timeNow)
        if (timeBegin === 0) {
            timeBegin = (new Date()).getTime();
            console.log("timeBegin: " + timeBegin);
            meterRefresh();
        }
        if ((timeNow - timeBegin) > (TIME_PER_TICK * 60)) {
            timeBegin = (new Date()).getTime();
            console.log("timeBegin second if: " + timeBegin);
            tick();
            meterRefresh();
        }

    }

    const render = () => {
        makeMeter();
        tickInterval = setInterval(() => {
            console.log('tick interval');
            tickCheck();
        }, 1000);
    }

    $('#Start-btn').on("click", render);

    $("#food-btn").on("click", gotchi.feed);

    $("#sleep-btn").on("click", gotchi.sleep);

    $("#play-btn").on("click", gotchi.play)



    $('#Stop-btn').click(function () {
        clearInterval(tickInterval);
    })
});