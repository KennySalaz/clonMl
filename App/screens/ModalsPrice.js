import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { Button } from 'react-native-elements';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { isEmpty } from 'lodash';
import { Input } from 'react-native-elements'


const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const Modals = ({ setProductForm, productForm, fireStorage, unploadFirestore, validateData }) => {
  const [visible, setVisible] = useState(false);
  const [errorPrice, setErrorPrice] = useState('')

  const validateNextModal = () => {
    if (!validateData()) {
      return
    }
    setVisible(true)

  }

  const validatePrice = () => {
    setErrorPrice('')
    let isValid = true
    if (isEmpty(productForm.price)) {
      setErrorPrice('debes ingresar un monto')
      isValid = false
    }

    return isValid
  }
  const onSubmitFirebase = () => {
    if (!validatePrice()) {
      return
    }
    unploadFirestore()
  }
  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ModalPoup visible={visible}>
          <Card.Title
            /*  title="Card Title" */
            subtitle="Enter Price"
            /*  left={(props) => <Avatar.Icon {...props} icon="folder" />} */
            right=
            {
              (props) => <Icon {...props} name='close' type='evilIcons' onPress={() => setVisible(false)} />
            }
          />
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            <Text>  Price </Text>
            <TextInput
              defaultValue={productForm.price}
              onChangeText={(value) => setProductForm({ ...productForm, price: value })}
              keyboardType={'numeric'}
              placeholder={errorPrice ? 'Debes Ingresar Un Monto' : '$'}
              placeholderTextColor={errorPrice && '#ff0000'}
              style={{
                flex: 1,
                height: 44,
                backgroundColor: '#f1f3f6',
                marginLeft: 10,
                borderRadius: 8,
                paddingHorizontal: 10,
              }}
            />
          </View>
          <View style={{ paddingTop: 20 }} >
            <Button
              onPress={onSubmitFirebase}
              title="Publicar" />
          </View>
        </ModalPoup>
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Publicar" onPress={validateNextModal} />
      </View>
    </>
  );
};

export default Modals

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,

    borderRadius: 10,
    elevation: 20,
  },

});