import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "nowrap",
      flexDirection: "column",
      alignItems: "center"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    button: {
      // margin: theme.spacing(3),
      "&.primaryButton": {
        margin: "30px 0"
      },
      width: 300
    },
    formControl: {
      margin: theme.spacing(1)
    },
    formHelper: {
      maxWidth: `calc(300px - 24px)`
    }
  })
);
