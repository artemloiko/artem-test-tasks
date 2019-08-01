import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'column',
      alignItems: 'center'
    },
    button: {
      // margin: theme.spacing(3),
      '&.primaryButton': {
        margin: '10px 0'
      },
      width: 300
    },
    formControl: {
      margin: 0
    },
    formHelper: {
      maxWidth: `calc(300px - 24px)`
    }
  })
);
