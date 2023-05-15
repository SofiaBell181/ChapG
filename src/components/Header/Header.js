import { useEffect, useRef } from 'react';
import {gsap} from 'gsap';
import Board from './Board';
import  './Header.css'

export default function Header() {
	const header = useRef();

	useEffect(() => {
		let ctx = gsap.context(() => {
		gsap.from(".linkHome", {
             opacity: 0,
             duration: 2,
             delay: 1.5
        });
 
        gsap.from(".block-title", {
             opacity: 0,
             duration: 2,
             delay: 1
        })
		}, header)

			return () => ctx.revert();
	}, [])

	return (
			<>
				<div className='container-header'>
					<div className='block-header' ref={header}>
						<div className="linkHome">
							<a href="#home">text</a>
						</div>

						<div className='block-title'>
							<h2>Dot strike </h2>
						</div>
					</div>
					<Board/>
				</div>
				
			</>
	)
}