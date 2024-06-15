import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

interface MakeDonationProps {
  campaignId: string;
}

const MakeDonation = ({ campaignId }: MakeDonationProps) => {
  const [amount, setAmount] = useState('');
  const [paymentGateway, setPaymentGateway] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inputBorderColor, setInputBorderColor] = useState('black');

  const predefinedAmounts = [500, 1000, 2000, 5000];
  const paymentGateways = ['M-Pesa', 'Tigo Pesa', 'Airtel Money', 'Visa'];

  const handleAmountChange = (text: string) => {
    if (!/^\d+$/.test(text)) {
      Alert.alert('Please enter a valid amount');
      setAmount('');
      setInputBorderColor('red');
    } else {
      setAmount(text);
      setInputBorderColor('black');
    }
  };

  const handlePaymentGatewayChange = async (gateway: string) => {
    setPaymentGateway(gateway);
    if (gateway === 'M-Pesa') {
      try {
        const response = await fetch('http://localhost:3000/donate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            campaignId,
            amount,
            fullName,
            email,
            phoneNumber,
            paymentGateway: gateway,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          Alert.alert('Payment Successful', `Transaction ID: ${data.transactionId}`);
        } else {
          Alert.alert('Payment Failed', data.message);
        }
      } catch (error) {
        Alert.alert('Payment Error', error.message);
      }
    }
  };

  const handleFullNameChange = (text: string) => {
    if (!/^[a-zA-Z\s]+$/.test(text)) {
      Alert.alert('Please enter a valid full name');
      setFullName('');
      setInputBorderColor('red');
    } else {
      setFullName(text);
      setInputBorderColor('black');
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePhoneNumberChange = (text: string) => {
    if (!/^[0-9]+$/.test(text)) {
      Alert.alert('Please enter a valid phone number');
      setPhoneNumber('');
      setInputBorderColor('red');
    } else {
      setPhoneNumber(text);
      setInputBorderColor('black');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Make a Donation</Text>
      <Text style={styles.campaignName}>Campaign: {campaignId}</Text>
      <TextInput
        style={[styles.input, { borderColor: inputBorderColor }]}
        placeholder="Enter Amount (TSH)"
        value={amount}
        onChangeText={handleAmountChange}
      />
      <View style={styles.predefinedAmountsContainer}>
        {predefinedAmounts.map((amount) => (
          <TouchableOpacity key={amount} style={styles.predefinedAmountButton} onPress={() => setAmount(amount.toString())}>
            <Text style={styles.predefinedAmountText}>{amount} TSH</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.paymentGatewayLabel}>Choose Payment Gateway</Text>
      <View style={styles.paymentGatewaysContainer}>
        {paymentGateways.map((gateway) => (
          <TouchableOpacity key={gateway} style={styles.paymentGatewayButton} onPress={() => handlePaymentGatewayChange(gateway)}>
            <Text style={styles.paymentGatewayText}>{gateway}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={handleFullNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
      />
      <TouchableOpacity style={styles.makePaymentButton} onPress={() => handlePaymentGatewayChange(paymentGateway)}>
        <Text style={styles.makePaymentText}>Make Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    padding: 24,
    paddingBottom: 48, // Additional padding for the bottom button
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  campaignName: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  predefinedAmountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24, // Increased spacing between predefined amounts
  },
  predefinedAmountButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 3,
    borderRadius: 8,
  },
  predefinedAmountText: {
    color: 'white',
    fontSize: 16,
  },
  paymentGatewayLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  paymentGatewaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24, // Increased spacing between payment gateways
  },
  paymentGatewayButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 15,
  },
  paymentGatewayText: {
    color: 'white',
    fontSize: 16,
  },
  makePaymentButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  makePaymentText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MakeDonation;
