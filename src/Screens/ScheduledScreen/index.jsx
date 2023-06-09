import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, ImageBackground } from 'react-native';

import ScreenView from '../ScreenView';
import COLORS from '../../constants/colors';

import { getReminders } from '../../store/actions/reminders.action';
import ReminderListItem from '../../components/ReminderListItem';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

export default ScheduledScreen = ({ route, navigation }) => {
	const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.currentUserId);
  const reminders = useSelector(state => state.reminders.reminders);
  
  // load after login
	useEffect(() => {
		dispatch(getReminders({userId: userId}));
	}, []);

  useFocusEffect(
    useCallback(() => {
      console.log('refreshing reminders')
      dispatch(getReminders({userId: userId}));
    }, [userId])
  );

	// console.log('list reminders:');
	// console.log(reminders);

  const handlePress = (reminder) => {
		dispatch(selectedReminder(reminder.id));
		// navigation.navigate('ViewReminder', {reminder});
	};

  // get only the reminders from now and the future
  const filteredReminders = reminders.filter(
    reminder => {
      return (reminder.date >= dayjs().valueOf());
    }
  );

	return (
		<ScreenView noScroll={true}>
			<ImageBackground source={require('../../assets/icons/box.png')} 
				style={{flex: 1}}
				resizeMode='center' 
				imageStyle={{opacity: 0.2, tintColor: COLORS.tertiary}}
			>
				<FlatList
					data={filteredReminders.sort((a, b) => { return a.date - b.date})}
					renderItem={({item, index}) => <ReminderListItem reminder={item} handlePress={handlePress} first={index === 0} />}
					keyExtractor={item => item.id}
				/>
			</ImageBackground>
		</ScreenView>
	);
}



