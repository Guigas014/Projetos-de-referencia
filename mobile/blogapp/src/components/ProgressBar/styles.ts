import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    //width: 200,
    height: 56,
    backgroundColor: '#29292E', 
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  value: {
    color: '#C4C4CC',
    marginRight: 6,
  },
  tracker: {
    flex: 1,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#505059', 
  },
  progress: {
    height: 3,
    backgroundColor: '#8257E5',   
  },
  progressContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}); 
