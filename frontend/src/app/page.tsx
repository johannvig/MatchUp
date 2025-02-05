import './globals.css';
import './page.css';
import Header from './Composants/Header/page'; 
import Footer from './Composants/Footer/page'; 
export default function Accueil() {
  return (
    <div id="Accueil">
      <Header /> {/* Ajoute ceci ici */}
      <div id="header">
        <img id="imageAccueil" src="accueil/AccueilTerrain.png" alt="" />
        <div id="containeurText">
          <h1>Bienvenue sur le service des sports de l’uqac</h1>
          <h3><br></br><br></br>Vous retrouverez ici toutes informations pour pratiqué du sport au sein de l’uqac <br></br><br></br>Vous pourez ici vous inscrire à des cours, participé à des tournois ainsi que reserver des terrains pour jouer entre vous.</h3>
        </div>
      </div>
      <div className="titre">
        <div className="barreSeparation"></div>
        <h2>Comment fonctionne ce service ?</h2>
        <div className="barreSeparation"></div>
      </div>
      <div id="containeurFonctionnementService">
        <div id="containeurText">
          <p>Ce service a pour but de vous permettre d’accéder facilement aux équipements sportifs de l’UQAC. Vous y trouverez des sports comme le badminton, le tennis, le pickleball, et bien d’autres activités.</p>
          <p><br />Vous pouvez réserver un terrain ou même participer à un tournoi. <br />
              - Étudiants : La réservation d’un terrain est gratuite.<br />
              - Employés : Vous bénéficiez d’une réduction.<br />
              - Externes : Vous êtes les bienvenus moyennant une participation financière, qui contribue à l’entretien des magnifiques équipements sportifs de l’UQAC.</p>
          <p>Si vous n’avez pas de raquette ou d’équipement, pas de panique ! L’UQAC propose également la location de matériel.</p>
        </div>
        <img src="accueil/imageBad.png" alt="" />
      </div>
      <div className="titre">
      <div className="barreSeparation"></div>
        <h2>Réserver un de nos terrains</h2>
        <div className="barreSeparation"></div>
      </div>
      <div id="containeurReservationSport">
        <a className="sportPetit">
          <img className='imagePetiteImage' src="accueil/badmintonReservation.png" alt="" />
          <button className='btnReservation'>Reserver un terrain de badminton</button>
        </a>
        <a className="sportPetit">
        <img className='imagePetiteImage' src="accueil/pickelballReservation.png" alt="" />
          <button className='btnReservation'>Reserver un terrain de pickleball</button>
        </a>
        <a className="sportPetit">
        <img className='imagePetiteImage' src="accueil/tennisReservation.png" alt="" />
          <button className='btnReservation'>Reserver un terrain de tennis</button>
        </a>
      </div>
      <div className="titre">
        <div className="barreSeparation"></div>
        <h2>Sport en équipes</h2>
        <div className="barreSeparation"></div>
      </div>
      <div id="containeurSportEquipe">
        <div className="sport">
          <a>Footbal US</a>
          <img src="accueil/football-us.jpg" alt="" />
        </div>
        <div className="sport">
          <img src="accueil/hockey.jpg" alt="" />
          <a>Hockey</a>
        </div>
        <div className="sport">
          <a>Basket</a>
          <img src="accueil/basket.jpg" alt="" />
        </div>
        <div className="sport">
          <img src="accueil/volley-ball.jpg" alt="" />
          <a>Volley ball</a>
        </div>
      </div>
      <Footer /> {/* Ajoute ceci ici */}
    </div>
  );
}
