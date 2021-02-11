import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Paper
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});
export const CatalogItem = ({title, text, price, phone, author}) => {
    const classes = useStyles();
    return (
        <Grid item>
            <Paper>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="http://www.galerieallen.com/cspdocs/artwork/images/daniel_turner_galerie_allen_1632.jpg"
                            title={title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {phone}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {text}
                            </Typography>
                            <h6>Телефон</h6>
                            {phone}
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        </Grid>
    )
}