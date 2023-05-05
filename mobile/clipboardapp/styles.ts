import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121214',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 32
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#323238',
    borderRadius: 5,
    padding: 16,
    color: '#FFFFFF'
  },
  button: {
    height: 56,
    width: 56,
    borderRadius: 5,
    backgroundColor: '#8257E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    flexDirection: 'row',
    gap: 16
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100
  }
});
