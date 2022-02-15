import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

  const Buttons = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link className="btnUi" to={`/`}>
        <Button variant="outlined">Поликлиника</Button>
      </Link>
      <Link className="btnUi" to={`/test/school`}>
        <Button variant="outlined" color="primary">
          ШКОЛЫ
        </Button>
      </Link>
      <Link className="btnUi" to={`/test/school/hotels`}>
        <Button variant="outlined" color="secondary">
          гостиницы
        </Button>
      </Link>
      <Link className="btnUi" to={`/test/school/hotels/police`}>
        <Button variant="outlined" disabled>
          милиция
        </Button>
      </Link>
      <Link className="btnUi" to={`/test`}>
        <Button variant="outlined" color="primary">
          ШАУРМА
        </Button>
      </Link>
    </div>
  );
}

export default Buttons;
