gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

let cursor = document.querySelector("#cursor")
let page4 = document.querySelector("#page4")
let svg = document.querySelector('#svg')
window.addEventListener('mousemove',function(e){
  gsap.to(cursor,{
    x:e.clientX -cursor.offsetWidth/2,
    y:e.clientY - cursor.offsetHeight/2
  })
})

page4.addEventListener('mouseenter',function(){
  svg.style.display = "block"
  gsap.to(cursor,{
    scale:2
  })
})
page4.addEventListener('mouseleave',function(){
  svg.style.display = "none"
  gsap.to(cursor,{
    scale:1
  })
})








const hero = document.querySelector('#loader');
const images = [
    "https://images.unsplash.com/photo-1502294624983-4ba589803a55?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1592809633737-175b65fd2b82?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1618333826210-34c62badc237?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1489913590284-9269438bb411?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1586233520069-dff24f171ada?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const settings = {
    isEnabled: false,
    time: 50,
    trailLength: 5, // Number of images in the trail
    trailDelay: 200 // Delay between each image creation in milliseconds
};

// Preload images before the animation starts
preloadImages(images);

function preloadImages(images) {
    images.forEach((imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
    });
}

const animateImages = (event) => {
    if (!settings.isEnabled) {
        settings.isEnabled = true;

        const imageSize = 20;

        for (let i = 0; i < settings.trailLength; i++) {
            setTimeout(() => {
                const image = document.createElement('img');
                const countIndex = Math.floor(Math.random() * images.length);

                image.classList.add('hero-media');
                image.setAttribute('src', images[countIndex]);
                image.style.width = `${imageSize}vw`;
                image.style.height = `${imageSize}vw`;
                image.style.top = event.pageY - (imageSize * 10) / 2 + 'px';
                image.style.left = event.pageX - (imageSize * 20) / 2 + 'px';
                hero.appendChild(image);

                const randomDeg = Math.floor(Math.random() * 15);

                setTimeout(() => {
                    image.style.opacity = 0;
                    // image.style.filter = 'blur(10px)';
                    image.style.transform = 'scale(0.25)';
                    image.style.transform = 'translateY(800%)';
                }, 1500);

                setTimeout(() => {
                    hero.removeChild(image);
                }, 2500);
            }, i * settings.trailDelay);
        }

        setTimeout(() => {
            settings.isEnabled = false;
        }, settings.time);
    }
};

hero.addEventListener('mousemove', animateImages);

















let ld = gsap.timeline()
function loadingAnim(){
  ld.to("#loader",{
    y:"-100%",
    duration:2.6,
    ease:"expo.in",
    onStart: function () {
      let timer = document.querySelector("#counter");
      let grow = 0;
      let interval = setInterval(function () {
        if (grow < 100) {
          grow++;
          timer.innerHTML = grow;
        } else {
          clearInterval(interval);
        }
      }, 20);
    },
  })
  ld.from("#nav",{
    opacity:0,
    duration:1
  },'l1')
  ld.from(".elem h1",{
    transform: "translateY(150%)",
    opacity:0,
    duration:1
  },'l1')
  ld.from("#page1 img",{
    opacity:0,
    duration:1
  },'l1')

}

loadingAnim()







let tl = gsap.timeline(
  {
    scrollTrigger:{
      scroller:"#main",
      trigger: "#date",
      start: "top 90%"
    }
  }
)
tl.to("#date1 h1",{
  transform: "translateY(-100%)",
  duration:.5
},'anim')
tl.to("#date2 h1",{
  transform: "translateY(-700%)",
  duration:2
},'anim')
tl.to("#date3 h1",{
  transform: "translateY(-800%)",
  duration:1.5
},'anim')
tl.to("#date4 h1",{
  transform: "translateY(-700%)",
  duration:1
},'anim')

gsap.from("#page4 img",{
  clipPath: "circle(0px at 55% 40%)",
  ease: "power4",
  duration: 1.5,
  scrollTrigger:{
    scroller:"#main",
    trigger: "#page4",
    start: "top 60%",
    
  }
})



gsap.to("#page5-part2 img",{
  scale:1.5,
  duration:2,
  scrollTrigger:{
    scroller:"#main",
    trigger: "#page5-part2",
    start: "top 50%",
    scrub:3
  }
})

// gsap.from(".page6-element h1",{
//   y:150,
//   duration:.5,
//   stagger: .2,
//   scrollTrigger:{
//     scroller:"#main",
//     trigger: ".page6-element",
//     start: "top 50%",
//   }
// })
gsap.to("#page8-image",{
  clipPath:"polygon(100% 0, 52% 52%, 52% 72%, 46% 72%, 46% 52%, 0 0)",
  width: "40vw",
  duration:1,
  scrollTrigger:{
    scroller: "#main",
    trigger: "#page8-image",
    scrub:3,
  }
})

if (window.innerWidth > 600){
  gsap.to('#img1', {
    scrollTrigger: {
        scroller: "#main",
        trigger: "#img1",
        start: "top top",
        onEnter: function () {
            gsap.to('#img1', {
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
                ease: "expo.in",
                duration: 1,
                delay: .2
            });
        },
        onLeaveBack: function () {
            gsap.to('#img1', {
                left: "-38%",
                top: "0%",
                height: "100%",
                width: "200%",
                ease: "expo.in",
                duration: 1,
                delay: .2
            });
        }
    }
  });
  gsap.to('#img2',{
      scrollTrigger:{
          scroller:"#main",
          trigger: "#img1",
          start: "top top",
          end: "top top",
          onEnter: function(){
            gsap.to('#img2',{
              height: '100%',
              width: '100%',
              left: "0%",
              top: "-25%",
              ease: "expo.in",
              duration: 1,
              delay:.2
            })
          },
          onLeaveBack:function(){
            gsap.to('#img2',{
              height: "100%",
              width: "300%",
              left:"-145%",
              duration: 1,
              ease: "expo.in",
              delay:.2
            })
          }
        }
  })
  

  
let tl2 = gsap.timeline({
  scrollTrigger:{
    scroller:"#main",
    trigger: "#page4",
    start: "top 0%",
    pin:true,
    end: "+=650%",
    scrub:3
  }
})
tl2.to("#nav",{
  opacity:0
})
tl2.to("#page4 img",{
  clipPath: "circle(10vw at 50% 65%)",
  ease: "power4",
  duration: 1
},'a')
tl2.to("#slide1",{
  opacity: 0,
  duration: .2,
  display: "none",
},'a')
tl2.to("#slide2",{
  opacity: 1,
  duration: .2,
  delay: -.7
})
tl2.to('#slide2',{
  display: "none",
  duration: .2,
  opacity:0,
})
tl2.to("#page4 img",{
  clipPath: "circle(10vw at 35% 65%)",
  ease: "power4",
  duration: 1
},'b')
tl2.to("#slide3",{
  opacity:1,
  duration:.2,
},'b')
tl2.to("#slide3",{
  opacity:0,
  display: "none",
  duration:.2,
})
tl2.to("#page4 img",{
  clipPath: "circle(10vw at 55% 65%)",
  ease: "power4",
  duration: 1
},'c')
tl2.to("#slide4",{
  opacity:1,
  duration:.2,
},'c')
tl2.to("#slide4",{
  opacity:0,
  display: "none",
  duration:.2,
})
tl2.to("#page4 img",{
  clipPath: "circle(6vw at 48% 50%)",
  ease: "power4",
  duration: 1
},'d')
tl2.to("#slide5",{
  opacity:1,
  duration:.2,
},'d')
tl2.to("#slide5",{
  opacity:0,
  display: "none",
  duration:.2,
})
tl2.to("#page4 img",{
  clipPath: "circle(6vw at 27% 70%)",
  ease: "power4",
  duration: 1
},'e')
tl2.to("#slide6",{
  opacity:1,
  duration:.2,
},'e')
tl2.to("#slide6",{
  opacity:0,
  display: "none",
  duration:.2,
})
tl2.to("#page4 img",{
  clipPath: "circle(100vw at 27% 70%)",
  ease: "power4",
  duration: 1
},'f')
tl2.to("#nav",{
  opacity:1
})


gsap.to("#page5-part2 img",{
  scale:1.5,
  duration:2,
  scrollTrigger:{
    scroller:"#main",
    trigger: "#page5-part2",
    start: "top 50%",
    scrub:3
  }
})

gsap.from(".page6-element h1",{
  y:150,
  duration:.5,
  stagger: .2,
  scrollTrigger:{
    scroller:"#main",
    trigger: ".page6-element",
    start: "top 50%",
  }
})

gsap.to("#page8-image",{
  clipPath:"polygon(100% 0, 52% 52%, 52% 72%, 46% 72%, 46% 52%, 0 0)",
  width: "40vw",
  duration:1,
  scrollTrigger:{
    scroller: "#main",
    trigger: "#page8-image",
    scrub:3,
  }
})



  
}

if (window.innerWidth < 600){
  gsap.to("#img1",{
    height:"100%",
    width:"100%",
    left:0,
    top:0,
    ease: "expo.in",
    duration: 1,
    scrollTrigger:{
      scroller:"#main",
      trigger:"#img1",
      start:"top -5%",
    }
  })
  gsap.to("#img2",{
    height:"200%",
    width:"200%",
    left:"-50%",
    top:"-74%",
    ease: "expo.in",
    duration: 1,
    scrollTrigger:{
      scroller:"#main",
      trigger:"#img1",
      start:"top -5%",
    }
  })


  
let tl2 = gsap.timeline({
  scrollTrigger:{
    scroller:"#main",
    trigger: "#page4",
    start: "top 0%",
    pin:true,
    end: "+=650%",
    scrub:3
  }
})
tl2.to("#nav",{
  opacity:0
})
tl2.to("#page4 img",{
  clipPath: "circle(30vw at 50% 65%)",
  ease: "power4",
  duration: 1
},'a')
tl2.to("#slide1",{
  opacity: 0,
  duration: .2,
  display: "none",
},'a')
tl2.to("#slide2",{
  opacity: 1,
  duration: .2,
  delay: -.7
})
tl2.to('#slide2',{
  display: "none",
  duration: .2,
  opacity:0,
})
tl2.to("#page4 img",{
  clipPath: "circle(30vw at 25% 65%)",
  ease: "power4",
  duration: 1
},'b')
tl2.to("#slide3",{
  opacity:1,
  duration:.2,
},'b')
tl2.to("#slide3",{
  opacity:0,
  display: "none",
  duration:.2,
})
tl2.to("#page4 img",{
  clipPath: "circle(30vw at 50% 65%)",
  ease: "power4",
  duration: 1
},'c')
tl2.to("#slide4",{
  opacity:1,
  duration:.2,
},'c')
tl2.to("#slide4",{
  opacity:0,
  display: "none",
  duration:.2,
})
tl2.to("#page4 img",{
  clipPath: "circle(30vw at 44% 50%)",
  ease: "power4",
  duration: 1
},'d')
tl2.to("#slide5",{
  opacity:1,
  duration:.2,
},'d')
tl2.to("#slide5",{
  opacity:0,
  display: "none",
  duration:.2,
})
tl2.to("#page4 img",{
  clipPath: "circle(30vw at 37% 55%)",
  objectPosition:"25% -50%",
  ease: "power4",
  duration: 1
},'e')
tl2.to("#slide6",{
  opacity:1,
  duration:.2,
},'e')
tl2.to("#slide6",{
  opacity:0,
  display: "none",
  duration:.2,
})
tl2.to("#page4 img",{
  clipPath: "circle(300vw at 27% 70%)",
  objectPosition:"center",
  ease: "power4",
  duration: 1
},'f')
tl2.to("#nav",{
  opacity:1
})

gsap.to("#page8-image",{
  clipPath:"polygon(100% 0, 52% 52%, 52% 72%, 46% 72%, 46% 52%, 0 0)",
  width: "90vw",
  duration:1,
  scrollTrigger:{
    scroller: "#main",
    trigger: "#page8-image",
    scrub:3,
  }
})

gsap.to("#page5-part2 img",{
  scale:1.5,
  duration:2,
  scrollTrigger:{
    scroller:"#main",
    trigger: "#page5-part2",
    start: "top 50%",
    scrub:3
  }
})


gsap.to("#page5-part2 img",{
  scale:1.5,
  duration:2,
  scrollTrigger:{
    scroller:"#main",
    trigger: "#page5-part2",
    start: "top 150%",
    scrub:3
  }
})

gsap.from(".page6-element h1",{
  y:150,
  duration:.5,
  stagger: .2,
  scrollTrigger:{
    scroller:"#main",
    trigger: ".page6-element",
    start: "top 50%",
  }
})










}

















