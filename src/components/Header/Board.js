import {React, useEffect, useRef, useState} from 'react';
import {gsap} from 'gsap';
import BoardGame from './BoardGame';

export default function Board() {

const constraintsRef = useRef(null);
const [startGame, setStartGame] = useState(false);


useEffect(() => {
    let ctx = gsap.context(() => {
       if(window.innerWidth > 600) {
         gsap.to('.board', {
            opacity:1, delay:0.5, duration: .4
        });

        gsap.to('.pinkBall', {
            duration: 1.1, delay:1, ease: "back.inOut(1.7)", y: 465
        });

        gsap.to('.blueBall', {
            duration: 1.1, delay:1, ease: "back.inOut(1.7)", y: -465
        });

        gsap.from('.text1', {
            opacity : 0, delay:1.5,  x: -200, duration: .4
        });

        gsap.to('.pinkBall', {
            duration: 1.1, delay:2.3, ease: "back.inOut(1.7)", x: 465
        });

        gsap.to('.blueBall', {
            duration: 1.1, delay:2.3, ease: "back.inOut(1.7)", x: -465
        });

        gsap.from('.text2', {
            opacity : 0, delay:2.8,  x: -200, duration: .4
        });

        gsap.to('.pinkBall', {
            duration: 1.1, delay:3.6, ease: "back.inOut(1.7)", y: 0	
        });

        gsap.to('.blueBall', {
            duration: 1.1, delay:3.6, ease: "back.inOut(1.7)", y: 0
        });

        gsap.from('.text3', {
            opacity : 0, delay:4.1,  x: -200, duration: .4
        });

        gsap.to('.pinkBall', {
            duration: 1.1, delay:4.9, ease: "back.inOut(1.7)", x: 0	
        });

        gsap.to('.blueBall', {
            duration: 1.1, delay:4.9, ease: "back.inOut(1.7)", x: 0
        });

        gsap.from('.text4', {
            opacity : 0, delay:5.4,  x: -200, duration: .4
        });

        gsap.to('.board', {
            opacity: 0,  delay:6,  duration: .5,
            onComplete: () => setStartGame(true),
        })
       }

       else {
        gsap.to('.board', {
            opacity:1, delay:0.6, duration: .4
        });

        gsap.to('.pinkBall', {
            duration: 1.1, delay:1, ease: "back.inOut(1.7)", y: 245
        });

        gsap.to('.blueBall', {
            duration: 1.1, delay:1, ease: "back.inOut(1.7)", y: -245
        });

        gsap.from('.text1', {
            opacity : 0, delay:1.5,  x: -50, duration: .4
        });

        gsap.to('.pinkBall', {
            duration: 1.1, delay:2.3, ease: "back.inOut(1.7)", x: 245
        });

        gsap.to('.blueBall', {
            duration: 1.1, delay:2.3, ease: "back.inOut(1.7)", x: -245
        });

        gsap.from('.text2', {
            opacity : 0, delay:2.8,  x: -50, duration: .4
        });

        gsap.to('.pinkBall', {
            duration: 1.1, delay:3.6, ease: "back.inOut(1.7)", y: 0	
        });

        gsap.to('.blueBall', {
            duration: 1.1, delay:3.6, ease: "back.inOut(1.7)", y: 0
        });

        gsap.from('.text3', {
            opacity : 0, delay:4.1,  x: -50, duration: .4
        });

        gsap.to('.pinkBall', {
            duration: 1.1, delay:4.9, ease: "back.inOut(1.7)", x: 0	
        });

        gsap.to('.blueBall', {
            duration: 1.1, delay:4.9, ease: "back.inOut(1.7)", x: 0
        });

        gsap.from('.text4', {
            opacity : 0, delay:5.4,  x: -50, duration: .4
        });

        gsap.to('.board', {
            opacity: 0,  delay:6,  duration: .5,
            onComplete: () => setStartGame(true),
        })
       }
       
    }, constraintsRef)

  
    
	return () => {
        ctx.revert();
       
    }
}, [])


    return(
        <> 
            <div className="block-board" ref={constraintsRef} >
                <div className={startGame ? 'boardHide board' : 'boardShow board'}>
                    <div className="ball pinkBall" />
                    <div className="ball blueBall"/>

                    <div className='board-text'>
                        <p className='text1'>Kick, </p>
                        <p className='text2'>Bang, </p>
                        <p className='text3'>Strike, </p>
                        <p className='text4'>like old schoolers</p>
                    </div>
                </div>
                <BoardGame start={startGame}/> 
            </div>
        </>
    )
}