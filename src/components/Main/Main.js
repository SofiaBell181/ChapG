import './Main.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Main() {

	useEffect(() => {
        AOS.init({duration:2000, once:true})
    },[])

	return (
		<>
			<div className="container-main">
				<div className='group-1' data-aos="fade-up" data-easing="linear">
					<div className="block-header__main">
					<h3>Dot strike - unique hybrid of checkers and billiard</h3>
					</div>

					<div className="block-logo"></div>

					<div className="linkStore">
						<a href="https://apps.apple.com/ru/app/dot-strike-unique-hybrid-of-checkers-and-billiard/id954646621?l=en">t</a>
					</div>
				</div>

				<div className="block-text" data-aos="fade-up" data-easing="linear">
					<p>The aim is to knock the opponent's pieces off the board. </p>
					<p>The game is very simple and intuitive to play.</p>
					<span className="icon icon-easyGame"></span>
				</div>

				<div className="block-features">
					<div className='features-header' data-aos="fade-up" data-easing="linear">
						<p className="features-title">Features:</p>
					</div>

					<div className="features" >
						<div className='card-feature' data-aos="fade-up" data-easing="linear">
							<div className="icon icon-multiplayer"></div>
							<div className="features-content">
								<p>- Online game</p>
							</div>
						</div>
						
						<div className='card-feature' data-aos="fade-up" data-easing="linear">
							<div className="icon icon-laptop"></div>
							<div className="features-content">
								<p>- Single player game against computer</p>
								<p>- Multiplayer game on one device</p>
							</div>
						</div>

						<div className='card-feature' data-aos="fade-up" data-easing="linear">
							<div className="icon icon-globe"></div>
							<div className="features-content">
								<p> Play on your device from any place in the world
								with your friends or random opponents.
								</p>
							</div>
						</div>
						
						<div className='card-feature' data-aos="fade-up" data-easing="linear">
							<div className="icon icon-wave"></div>
							<div className="features-content">
								<p>- various musical compositions</p>
								<p>- stunning sound effects</p>
							</div>
						</div>

						<div className='card-feature' data-aos="fade-up" data-easing="linear">
							<div className="icon icon-kawail"></div>
							<div className="features-content">
								<p>Themes:</p>
								<p>- Collection of 5 marvellous themes</p>
								<p>- Animated visual effects</p>
							</div>
						</div>

					</div>
				</div>
			</div>

		</>
	)
}

