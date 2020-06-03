import React, {Component} from 'react';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FoodData from '../../json/menu-food.json';

import {
  FlatList,
  StyleSheet,
  View,  
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      food: [],
      chart: []
    };
 }

 componentDidMount(){
     this.setState({food: FoodData})
 }

  addToChart = (item) => {
    this.setState((prevState) => ({
      chart: [
        ...prevState.chart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
        },
      ],
    }));
 }
 
  render() {
    const {food, chart} = this.state;
    const total = chart.map((v) => v.price).reduce((a, b) => a + b, 0);
    const findDuplicate = arr => arr.filter((item,index)=>arr.indexOf(item) != index)
    return (
      <View style={styles.container}>
        <FlatList
         data={food.data}
         renderItem={({item})=>(
          <TouchableOpacity 
          onPress={()=>this.addToChart(item)}
          style={styles.menuBox}>
            <Image source={{uri: item.imgUrl}} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
         )}
         keyExtractor={item=>item.id}
         numColumns={4}
         />
        <View style={styles.billContainer}>
             <View style={styles.billHeader}>
                 <View style={styles.headerIcon}>
                  <Image source={{uri: "https://img.icons8.com/metro/52/000000/user-male-circle.png"}} style={styles.headerImg} />
                  <Text style={{fontSize:8}}>Customer</Text>
                 </View>
                  <View><Text style={styles.headerTitle}>New Customer</Text></View>
                 <View style={styles.headerIcon}>
                  <Image source={{uri: "https://img.icons8.com/metro/52/000000/bill.png"}} style={styles.headerImg} />
                  <Text style={{fontSize:8}}>Billing List</Text>
                 </View>
             </View>
             <View style={styles.billList}>
                <FlatList 
                 data={this.state.chart}
                 renderItem={({item})=>(
                     <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginLeft:10,marginRight:10}}>
                      <Text>{item.name}</Text>
                      <Text>Rp. {item.price}</Text>
                     </View>
                 )}
                 keyExtractor={item=>item.id}
                />
             </View>
             <View style={styles.billDesc}>
              <Text>Subtotal: Rp. {total}</Text>
              <Text>Total: Rp. {total}</Text>
             </View>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
             <TouchableOpacity style={styles.buttonCharge}>
              <Text style={styles.textButton}>Charge</Text>
              </TouchableOpacity>
             <TouchableOpacity 
             onPress={()=>this.setState({chart: []})}
             style={styles.buttonCharge}>
              <Text style={styles.textButton}>Clear</Text>
             </TouchableOpacity>
             <TouchableOpacity
             onPress={()=>alert("Saved")}
             style={styles.buttonCharge}>
              <Text style={styles.textButton}>Save Bill</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.buttonCharge}>
              <Text style={styles.textButton}>Print Bill</Text>
             </TouchableOpacity>
            </View>
         </View>
      </View>
      );
 }
}

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
    padding: 10,
    backgroundColor: '#e8e4e1'
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  menuBox: {
    backgroundColor: '#f2f2f2',
    width: wp('21%'),
    height: hp('21%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 5,
  },
  image:{
    width: '100%',
    height: '80%',
    marginBottom: hp('5%'),
  },
  billContainer: {
    marginBottom: hp('3%'),
    backgroundColor: 'white'
  },
  billHeader: {
    backgroundColor: '#d4f3ef',
    height: hp('9%'),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 5,
  },
  text:{
    fontSize: 11,
    textAlign: 'center',
    paddingTop: hp('16%'),
    position: 'absolute',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerImg: {
    width: wp('8%'),
    height: hp('5%')
  },
  billDesc:{
    backgroundColor: 'white',
  },
  buttonCharge: {
    backgroundColor: '#1b6ca8',
    height: hp('6%'),
    borderRadius: 5,
    padding: 10,   
  },
  textButton: {
    fontSize: 18,
    color: 'white',
  },
  billList:{
    height: hp('30%')
  },
  headerIcon:{
    height: '100%',
  }
});

export default Home;
