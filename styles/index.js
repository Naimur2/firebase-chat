import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vstack: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    width: '45%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  large: {
    fontWeight: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  hstack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card:{
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
});

export default styles;
