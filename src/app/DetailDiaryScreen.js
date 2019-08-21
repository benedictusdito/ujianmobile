import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Item,
  Input
} from "native-base";

import Fire from "../firebase";

// Untuk mengambil data dari navigate menggunakan
// navigation.getParam('nama parameternya') / 'data_diary'
class DetailDiaryScreen extends Component {
  state = {
    karyawan: this.props.navigation.getParam("data_diary"),
    edit: false,
    nama: this.props.navigation.getParam("data_diary").nama,
    usia: this.props.navigation.getParam("data_diary").usia,
    jabatan: this.props.navigation.getParam("data_diary").jabatan
  };

  onDeleteButton = async () => {
    // Menghapus data
    await Fire.database()
      .ref(`karyawan/${this.props.uid}/${this.state.karyawan.id}`)
      .remove();
    // kembali ke halaman sebelumnya.
    this.props.navigation.goBack();
  };

  onSaveButton = () => {
    // EMPAT
    Fire.database()
      .ref(`karyawan/${this.props.uid}/${this.state.karyawan.id}`)
      .update({
        nama: this.state.nama,
        usia: this.state.usia,
        jabatan: this.state.jabatan
      });

    this.props.navigation.goBack();
  };

  onEditButton = () => {
    // Mengubah state.edit menjadi true
    this.setState({ edit: true });
  };

  onCancelButton = () => {
    // Mengubah state.edit menjadi true
    this.setState({ edit: false });
  };

  render() {
    // Mengambil data yang di kirim dari navigate
    if (this.state.edit) {
      var karyawan = this.state.karyawan;

      return (
        <Container>
          <View style={styles.container}>
            <Text style={{ fontSize: 20 }}>Edit Karyawan</Text>
            <View style={styles.wrapper}>
              <Item rounded>
                <Input
                  value={this.state.nama}
                  placeholder="Title"
                  onChangeText={text => this.setState({ nama: text })}
                />
              </Item>

              <Item rounded>
                <Input
                  value={this.state.usia}
                  placeholder="Title"
                  onChangeText={text => this.setState({ usia: text })}
                />
              </Item>

              <Item rounded>
                <Input
                  value={this.state.jabatan}
                  placeholder="Title"
                  onChangeText={text => this.setState({ jabatan: text })}
                />
              </Item>

              <View style={styles.button}>
                <Button block onPress={this.onSaveButton}>
                  <Text>SAVE</Text>
                </Button>
                <Button block onPress={this.onCancelButton}>
                  <Text>CANCEL</Text>
                </Button>
              </View>
            </View>
          </View>
        </Container>
      );
    } else {
      var karyawan = this.state.karyawan;
      return (
        <Container>
          <Content>
            <Text style={{ fontSize: 20 }}>Detail Karyawan</Text>

            <Card>
              <CardItem>
                <Text>Nama: {karyawan.nama}</Text>
              </CardItem>
              <CardItem>
                <Text>Usia: {karyawan.usia}</Text>
              </CardItem>
              <CardItem>
                <Text>Jabatan: {karyawan.jabatan}</Text>
              </CardItem>
              <View style={styles.button}>
                <Button block onPress={this.onEditButton}>
                  <Text>Edit</Text>
                </Button>
                <Button block onPress={this.onDeleteButton}>
                  <Text>Delete</Text>
                </Button>
              </View>
            </Card>
          </Content>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold"
  },
  button: {
    height: 100,
    justifyContent: "space-between",
    marginTop: 10
  }
});

const mapStateToProps = state => {
  return {
    uid: state.auth.uid
  };
};
export default connect(mapStateToProps)(DetailDiaryScreen);
