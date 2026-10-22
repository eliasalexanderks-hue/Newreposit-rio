import { Link } from "react-router-dom";
import HomeCarousel from "../components/HomeCarousel.jsx";

export default function Home() {
	return <>
		<HomeCarousel />
		<section className="home-intro">
			<p className="eyebrow">Lanches e tecnologia no mesmo lugar</p>
			<h2>Seu rolê merece um Show de Bola.</h2>
			<p>Escolha um lanche caprichado ou encontre o periférico para elevar sua jogatina.</p>
			<div className="actions"><Link className="btn btn-primary" to="/lanches">Ver lanches</Link><Link className="btn btn-secondary" to="/perifericos">Ver periféricos</Link></div>
		</section>
		<section aria-labelledby="categorias-titulo">
			<h2 id="categorias-titulo">Escolha sua categoria</h2>
			<div className="category-grid">
				<Link className="card category-card" to="/lanches"><img src="/images/burger-portrait.jpg" alt="Vitão segurando um hambúrguer" /><div><h3>Lanches</h3><p>Opções para matar a fome.</p></div></Link>
				<Link className="card category-card" to="/perifericos"><img src="/images/smartwatch-gamer.jpg" alt="Vitão mostrando um relógio inteligente" /><div><h3>Periféricos</h3><p>Equipamentos para jogar melhor.</p></div></Link>
			</div>
		</section>
	</>;
}
