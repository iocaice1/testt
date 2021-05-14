import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import clsx from "clsx";
import { db } from "../../firebase";
import Modal from "@material-ui/core/Modal";
import { getModalStyle } from "../../utils";
import ModalBody from "../ModalBody";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = ({ numSelected, selecteds, setSelected }) => {
  const classes = useToolbarStyles();
  const anotherClasses = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const deleted = () => {
    selecteds.map((selected) =>
      db
        .collection("products")
        .doc(selected)
        .delete()
        .then(() => {
          alert("Product successfully deleted!");
        })
        .catch((error) => {
          console.log("Error removing product: ", error);
        })
    );
    setSelected([]);
  };

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Products
          </Typography>
        )}

        {numSelected > 0 ? (
          <>
            <Tooltip title="Edit">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setOpen(true);
                }}
                disabled={numSelected > 1}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={deleted}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <ModalBody
          style={modalStyle}
          className={anotherClasses.paper}
          setOpen={setOpen}
          selected={numSelected === 1 ? selecteds : undefined}
          setSelected={setSelected}
        />
      </Modal>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selecteds: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
