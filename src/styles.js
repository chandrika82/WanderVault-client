import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: 'rgb(162, 0, 255)',
  },
  image: {
    marginLeft: '15px',
  },
}));

export default useStyles;
