import { StyledCard, StyledCardContent } from "./style";

const GenreCard = ({img, genreName}: {img: string, genreName: string}) => {
	return (
		<StyledCard>
			<StyledCardContent>
				<img className="genre-card__img" src={img} alt={genreName} width="130" height="180"/>
				<h3>{genreName}</h3>
			</StyledCardContent>
		</StyledCard>
	);
};

export default GenreCard;
