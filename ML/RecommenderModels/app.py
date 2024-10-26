from flask import Flask, request, jsonify
import joblib
import pandas as pd
import random
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
application = app
model = joblib.load('Models/rf_model.pkl')
rf_model = joblib.load('random_forest_regressor_model2.pkl')
soil_type_mapping = {'Black': 0, 'Clayey': 1, 'Loamy': 2, 'Red': 3, 'Sandy': 4}
crop_type_mapping = {'Barley': 0, 'Cotton': 1, 'Ground Nuts': 2, 'Maize': 3, 'Millets': 4, 'Oil seeds': 5,
                     'Paddy': 6, 'Pulses': 7, 'Sugarcane': 8, 'Tobacco': 9, 'Wheat': 10}
fertilizer_name_mapping = {0: '10-26-26', 1: '14-35-14', 2: '17-17-17', 3: '20-20', 4: '28-28', 5: 'DAP', 6: 'Urea'}
rf_cols = ['Crop_Year', 'Area', 'District_Name_AHMADABAD', 'District_Name_ALAPPUZHA', 'District_Name_AMBALA', 'District_Name_AMRELI', 'District_Name_ANAND', 'District_Name_ANANTAPUR', 'District_Name_ANANTNAG', 'District_Name_ANJAW', 'District_Name_ARARIA', 'District_Name_ARWAL', 'District_Name_AURANGABAD', 'District_Name_BADGAM', 'District_Name_BAGALKOT', 'District_Name_BAKSA', 'District_Name_BALOD', 'District_Name_BALODA BAZAR', 'District_Name_BALRAMPUR', 'District_Name_BANAS KANTHA', 'District_Name_BANDIPORA', 'District_Name_BANGALORE RURAL', 'District_Name_BANKA', 'District_Name_BARAMULLA', 'District_Name_BARPETA', 'District_Name_BASTAR', 'District_Name_BEGUSARAI', 'District_Name_BELGAUM', 'District_Name_BELLARY', 'District_Name_BEMETARA', 'District_Name_BENGALURU URBAN', 'District_Name_BHAGALPUR', 'District_Name_BHARUCH', 'District_Name_BHAVNAGAR', 'District_Name_BHIWANI', 'District_Name_BHOJPUR', 'District_Name_BIDAR', 'District_Name_BIJAPUR', 'District_Name_BILASPUR', 'District_Name_BOKARO', 'District_Name_BONGAIGAON', 'District_Name_BUXAR', 'District_Name_CACHAR', 'District_Name_CHAMARAJANAGAR', 'District_Name_CHAMBA', 'District_Name_CHANDIGARH', 'District_Name_CHANGLANG', 'District_Name_CHATRA', 'District_Name_CHIKBALLAPUR', 'District_Name_CHIKMAGALUR', 'District_Name_CHIRANG', 'District_Name_CHITRADURGA', 'District_Name_CHITTOOR', 'District_Name_DADRA AND NAGAR HAVELI', 'District_Name_DAKSHIN KANNAD', 'District_Name_DANG', 'District_Name_DANTEWADA', 'District_Name_DARBHANGA', 'District_Name_DARRANG', 'District_Name_DAVANGERE', 'District_Name_DEOGHAR', 'District_Name_DHAMTARI', 'District_Name_DHANBAD', 'District_Name_DHARWAD', 'District_Name_DHEMAJI', 'District_Name_DHUBRI', 'District_Name_DIBANG VALLEY', 'District_Name_DIBRUGARH', 'District_Name_DIMA HASAO', 'District_Name_DODA', 'District_Name_DOHAD', 'District_Name_DUMKA', 'District_Name_DURG', 'District_Name_EAST GODAVARI', 'District_Name_EAST KAMENG', 'District_Name_EAST SIANG', 'District_Name_EAST SINGHBUM', 'District_Name_ERNAKULAM', 'District_Name_FARIDABAD', 'District_Name_FATEHABAD', 'District_Name_GADAG', 'District_Name_GANDERBAL', 'District_Name_GANDHINAGAR', 'District_Name_GARHWA', 'District_Name_GARIYABAND', 'District_Name_GAYA', 'District_Name_GIRIDIH', 'District_Name_GOALPARA', 'District_Name_GODDA', 'District_Name_GOLAGHAT', 'District_Name_GOPALGANJ', 'District_Name_GULBARGA', 'District_Name_GUMLA', 'District_Name_GUNTUR', 'District_Name_GURGAON', 'District_Name_HAILAKANDI', 'District_Name_HAMIRPUR', 'District_Name_HASSAN', 'District_Name_HAVERI', 'District_Name_HAZARIBAGH', 'District_Name_HISAR', 'District_Name_IDUKKI', 'District_Name_JAMMU', 'District_Name_JAMNAGAR', 'District_Name_JAMTARA', 'District_Name_JAMUI', 'District_Name_JANJGIR-CHAMPA', 'District_Name_JASHPUR', 'District_Name_JEHANABAD', 'District_Name_JHAJJAR', 'District_Name_JIND', 'District_Name_JORHAT', 'District_Name_JUNAGADH', 'District_Name_KABIRDHAM', 'District_Name_KACHCHH', 'District_Name_KADAPA', 'District_Name_KAIMUR (BHABUA)', 'District_Name_KAITHAL', 'District_Name_KAMRUP', 'District_Name_KAMRUP METRO', 'District_Name_KANGRA', 'District_Name_KANKER', 'District_Name_KANNUR', 'District_Name_KARBI ANGLONG', 'District_Name_KARGIL', 'District_Name_KARIMGANJ', 'District_Name_KARNAL', 'District_Name_KASARAGOD', 'District_Name_KATHUA', 'District_Name_KATIHAR', 'District_Name_KHAGARIA', 'District_Name_KHEDA', 'District_Name_KHUNTI', 'District_Name_KINNAUR', 'District_Name_KISHANGANJ', 'District_Name_KISHTWAR', 'District_Name_KODAGU', 'District_Name_KODERMA', 'District_Name_KOKRAJHAR', 'District_Name_KOLAR', 'District_Name_KOLLAM', 'District_Name_KONDAGAON', 'District_Name_KOPPAL', 'District_Name_KORBA', 'District_Name_KOREA', 'District_Name_KOTTAYAM', 'District_Name_KRISHNA', 'District_Name_KULGAM', 'District_Name_KULLU', 'District_Name_KUPWARA', 'District_Name_KURNOOL', 'District_Name_KURUKSHETRA', 'District_Name_KURUNG KUMEY', 'District_Name_LAHUL AND SPITI', 'District_Name_LAKHIMPUR', 'District_Name_LAKHISARAI', 'District_Name_LATEHAR', 'District_Name_LEH LADAKH', 'District_Name_LOHARDAGA', 'District_Name_LOHIT', 'District_Name_LONGDING', 'District_Name_LOWER DIBANG VALLEY', 'District_Name_LOWER SUBANSIRI', 'District_Name_MADHEPURA', 'District_Name_MADHUBANI', 'District_Name_MAHASAMUND', 'District_Name_MAHENDRAGARH', 'District_Name_MAHESANA', 'District_Name_MANDI', 'District_Name_MANDYA', 'District_Name_MARIGAON', 'District_Name_MEWAT', 'District_Name_MUNGELI', 'District_Name_MUNGER', 'District_Name_MUZAFFARPUR', 'District_Name_MYSORE', 'District_Name_NAGAON', 'District_Name_NALANDA', 'District_Name_NALBARI', 'District_Name_NAMSAI', 'District_Name_NARAYANPUR', 'District_Name_NARMADA', 'District_Name_NAVSARI', 'District_Name_NAWADA', 'District_Name_NICOBARS', 'District_Name_NORTH AND MIDDLE ANDAMAN', 'District_Name_NORTH GOA', 'District_Name_PAKUR', 'District_Name_PALAMU', 'District_Name_PALWAL', 'District_Name_PANCH MAHALS', 'District_Name_PANCHKULA', 'District_Name_PANIPAT', 'District_Name_PAPUM PARE', 'District_Name_PASHCHIM CHAMPARAN', 'District_Name_PATAN', 'District_Name_PATNA', 'District_Name_POONCH', 'District_Name_PORBANDAR', 'District_Name_PRAKASAM', 'District_Name_PULWAMA', 'District_Name_PURBI CHAMPARAN', 'District_Name_PURNIA', 'District_Name_RAICHUR', 'District_Name_RAIGARH', 'District_Name_RAIPUR', 'District_Name_RAJAURI', 'District_Name_RAJKOT', 'District_Name_RAJNANDGAON', 'District_Name_RAMANAGARA', 'District_Name_RAMBAN', 'District_Name_RAMGARH', 'District_Name_RANCHI', 'District_Name_REASI', 'District_Name_REWARI', 'District_Name_ROHTAK', 'District_Name_ROHTAS', 'District_Name_SABAR KANTHA', 'District_Name_SAHARSA', 'District_Name_SAHEBGANJ', 'District_Name_SAMASTIPUR', 'District_Name_SAMBA', 'District_Name_SARAIKELA KHARSAWAN', 'District_Name_SARAN', 'District_Name_SHEIKHPURA', 'District_Name_SHEOHAR', 'District_Name_SHIMLA', 'District_Name_SHIMOGA', 'District_Name_SHOPIAN', 'District_Name_SIMDEGA', 'District_Name_SIRMAUR', 'District_Name_SIRSA', 'District_Name_SITAMARHI', 'District_Name_SIVASAGAR', 'District_Name_SIWAN', 'District_Name_SOLAN', 'District_Name_SONIPAT', 'District_Name_SONITPUR', 'District_Name_SOUTH ANDAMANS', 'District_Name_SOUTH GOA', 'District_Name_SPSR NELLORE', 'District_Name_SRIKAKULAM', 'District_Name_SRINAGAR', 'District_Name_SUKMA', 'District_Name_SUPAUL', 'District_Name_SURAJPUR', 'District_Name_SURAT', 'District_Name_SURENDRANAGAR', 'District_Name_SURGUJA', 'District_Name_TAPI', 'District_Name_TAWANG', 'District_Name_TINSUKIA', 'District_Name_TIRAP', 'District_Name_TUMKUR', 'District_Name_UDALGURI', 'District_Name_UDHAMPUR', 'District_Name_UDUPI', 'District_Name_UNA', 'District_Name_UPPER SIANG', 'District_Name_UPPER SUBANSIRI', 'District_Name_UTTAR KANNAD', 'District_Name_VADODARA', 'District_Name_VAISHALI', 'District_Name_VALSAD', 'District_Name_VISAKHAPATANAM', 'District_Name_VIZIANAGARAM', 'District_Name_WEST GODAVARI', 'District_Name_WEST KAMENG', 'District_Name_WEST SIANG', 'District_Name_WEST SINGHBHUM', 'District_Name_YADGIR', 'District_Name_YAMUNANAGAR', 'Season_Autumn', 'Season_Kharif', 'Season_Rabi', 'Season_Summer', 'Season_Whole Year', 'Season_Winter', 'Crop_Arcanut (Processed)', 'Crop_Arecanut', 'Crop_Arhar/Tur', 'Crop_Atcanut (Raw)', 'Crop_Bajra', 'Crop_Banana', 'Crop_Barley', 'Crop_Beans & Mutter(Vegetable)', 'Crop_Bhindi', 'Crop_Bitter Gourd', 'Crop_Black pepper', 'Crop_Blackgram', 'Crop_Bottle Gourd', 'Crop_Brinjal', 'Crop_Cabbage', 'Crop_Cardamom', 'Crop_Carrot', 'Crop_Cashewnut', 'Crop_Cashewnut Processed', 'Crop_Cashewnut Raw', 'Crop_Castor seed', 'Crop_Citrus Fruit', 'Crop_Coconut ', 'Crop_Coffee', 'Crop_Cond-spcs other', 'Crop_Coriander', 'Crop_Cotton(lint)', 'Crop_Cowpea(Lobia)', 'Crop_Cucumber', 'Crop_Drum Stick', 'Crop_Dry chillies', 'Crop_Dry ginger', 'Crop_Garlic', 'Crop_Ginger', 'Crop_Gram', 'Crop_Grapes', 'Crop_Groundnut', 'Crop_Guar seed', 'Crop_Horse-gram', 'Crop_Jack Fruit', 'Crop_Jowar', 'Crop_Jute', 'Crop_Khesari', 'Crop_Korra', 'Crop_Lemon', 'Crop_Linseed', 'Crop_Maize', 'Crop_Mango', 'Crop_Masoor', 'Crop_Mesta', 'Crop_Moong(Green Gram)', 'Crop_Moth', 'Crop_Niger seed', 'Crop_Oilseeds total', 'Crop_Onion', 'Crop_Orange', 'Crop_Other  Rabi pulses', 'Crop_Other Cereals & Millets', 'Crop_Other Fresh Fruits', 'Crop_Other Kharif pulses', 'Crop_Other Vegetables', 'Crop_Paddy', 'Crop_Papaya', 'Crop_Peas  (vegetable)', 'Crop_Peas & beans (Pulses)', 'Crop_Pineapple', 'Crop_Pome Fruit', 'Crop_Pome Granet', 'Crop_Potato', 'Crop_Pulses total', 'Crop_Pump Kin', 'Crop_Ragi', 'Crop_Rapeseed &Mustard', 'Crop_Redish', 'Crop_Rice', 'Crop_Rubber', 'Crop_Safflower', 'Crop_Samai', 'Crop_Sannhamp', 'Crop_Sapota', 'Crop_Sesamum', 'Crop_Small millets', 'Crop_Snak Guard', 'Crop_Soyabean', 'Crop_Sugarcane', 'Crop_Sunflower', 'Crop_Sweet potato', 'Crop_Tapioca', 'Crop_Tea', 'Crop_Tobacco', 'Crop_Tomato', 'Crop_Turmeric', 'Crop_Turnip', 'Crop_Urad', 'Crop_Varagu', 'Crop_Wheat', 'Crop_other fibres', 'Crop_other misc. pulses', 'Crop_other oilseeds']
fertilizer_descriptions = {
    '10-26-26': (
        "This balanced fertilizer contains 10% Nitrogen (N), 26% Phosphorus (P), and 26% Potassium (K). "
        "It is particularly effective for crops that require strong root development and enhanced flowering. "
        "The high phosphorus content aids in the establishment of roots, making it ideal for use during the early stages of plant growth or when transplanting. "
        "The potassium supports the overall health of the plant by strengthening the plant's ability to resist diseases and stress, including drought."
    ),
    '14-35-14': (
        "This fertilizer contains 14% Nitrogen, 35% Phosphorus, and 14% Potassium, making it a phosphorus-rich option. "
        "It is especially useful for crops that demand significant root development and flowering. "
        "The elevated phosphorus level promotes early plant development and enhances the blooming phase. "
        "While the moderate levels of nitrogen and potassium ensure that the plants have adequate green growth and overall health, this formulation is particularly suitable for flowering plants and root crops."
    ),
    '17-17-17': (
        "An all-purpose fertilizer containing 17% Nitrogen, 17% Phosphorus, and 17% Potassium. "
        "This balanced nutrient ratio is designed for general use across a wide variety of crops, providing comprehensive nutrition. "
        "Nitrogen promotes lush, green foliage; phosphorus encourages strong root development and efficient energy transfer within the plant; "
        "potassium aids in water regulation, enzyme activation, and disease resistance. This fertilizer is often used when a balanced nutritional approach is needed throughout the growing season."
    ),
    '20-20': (
        "This fertilizer offers 20% Nitrogen and 20% Phosphorus. It is primarily nitrogen-rich, making it ideal for promoting leafy, vegetative growth, which is crucial during the early stages of plant development. "
        "The phosphorus content supports root development and energy transfer, helping plants establish themselves more effectively. "
        "This formulation is particularly useful for leafy vegetables, cereals, and other crops that benefit from vigorous top growth."
    ),
    '28-28': (
        "Containing 28% Nitrogen and 28% Phosphorus, this fertilizer is designed to provide a strong nitrogen-phosphorus boost to plants. "
        "The high nitrogen content drives lush, green foliage, making it suitable for the vegetative phase of growth. "
        "Phosphorus ensures robust root systems and aids in flowering and fruiting, which is essential for crops needing extensive root support or those grown in soils with low phosphorus levels."
    ),
    'DAP': (
        "Di-Ammonium Phosphate (DAP) is a widely used fertilizer containing 18% Nitrogen and 46% Phosphorus. "
        "This high-phosphorus fertilizer is ideal for boosting root growth and enhancing flower and fruit production. "
        "Nitrogen supports vigorous leaf and stem growth, while phosphorus is crucial for root development and energy transfer, "
        "making DAP particularly beneficial during the early stages of crop growth or when soil tests indicate low phosphorus levels."
    ),
    'Urea': (
        "Urea is a highly concentrated nitrogen fertilizer containing 46% Nitrogen. It is known for providing a quick release of nitrogen, "
        "which is essential for promoting rapid, lush, green growth in plants. "
        "Nitrogen is a critical component of chlorophyll, the compound plants use in photosynthesis, and is vital for leafy crops, grasses, and cereals. "
        "Urea is often applied to crops needing a fast nitrogen boost, especially in the early growth stages or when signs of nitrogen deficiency appear."
    )
}
soil_type_inverse_mapping = {v: k for k, v in soil_type_mapping.items()}
crop_type_inverse_mapping = {v: k for k, v in crop_type_mapping.items()}

# Feature ranges
feature_ranges = {
    'Temparature': (25, 38),
    'Humidity': (50, 72),
    'Soil Moisture': (25, 65),
    'Nitrogen': (4, 42),
    'Potassium': (0, 19),
    'Phosphorous': (0, 42)
}
model_crop = joblib.load('random_forest_model.pkl')
scaler = joblib.load('scaler.pkl')
# Define the prediction function
def predict_new_data(new_data):
    # Ensure new data has the same columns and order
    new_data = pd.DataFrame(new_data, columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])
    
    # Scale the new data
    new_data_scaled = scaler.transform(new_data)
    
    # Make predictions
    predictions = model_crop.predict(new_data_scaled)
    
    return predictions

feature_ranges2 = {
    'N': (0, 140),
    'P': (5, 145),
    'K': (5, 205),
    'temperature': (8.825675, 43.675493),
    'humidity': (14.258040, 99.981876),
    'ph': (3.504752, 9.935091),
    'rainfall': (20.211267, 298.560117)
}

@app.route('/crop_rec', methods=['POST'])
def crop_rec():
    data = request.json

    # Generate dummy inputs if no data is provided
    if not data:
        data = {
            'N': random.randint(*feature_ranges2['N']),
            'P': random.randint(*feature_ranges2['P']),
            'K': random.randint(*feature_ranges2['K']),
            'temperature': round(random.uniform(*feature_ranges2['temperature']), 2),
            'humidity': round(random.uniform(*feature_ranges2['humidity']), 2),
            'ph': round(random.uniform(*feature_ranges2['ph']), 2),
            'rainfall': round(random.uniform(*feature_ranges2['rainfall']), 2),
        }

    try:
        # Convert the data to a DataFrame
        df_input = pd.DataFrame([data])

        # Make prediction (replace with your actual prediction function)
        predictions = predict_new_data(df_input)

        return jsonify({'predictions': predictions.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)

@app.route('/fert_predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Randomly choose a soil type and crop type if not provided
    soil_type = soil_type_mapping.get(data.get('Soil Type', random.choice(list(soil_type_mapping.keys()))))
    crop_type = crop_type_mapping.get(data.get('Crop Type', random.choice(list(crop_type_mapping.keys()))))
    temperature = random.randint(*feature_ranges['Temparature'])
    humidity = random.randint(*feature_ranges['Humidity'])
    soil_moisture = random.randint(*feature_ranges['Soil Moisture'])
    nitrogen = random.randint(*feature_ranges['Nitrogen'])
    potassium = random.randint(*feature_ranges['Potassium'])
    phosphorous = random.randint(*feature_ranges['Phosphorous'])

    # Create the input DataFrame for the model
    df_input = pd.DataFrame([{
        'Temparature': temperature,
        'Humidity': humidity,
        'Soil Moisture': soil_moisture,
        'Soil Type': soil_type,
        'Crop Type': crop_type,
        'Nitrogen': nitrogen,
        'Potassium': potassium,
        'Phosphorous': phosphorous
    }])

    # Make prediction
    prediction = model.predict(df_input)[0]

    # Decode the prediction back to the fertilizer name
    fertilizer_name = fertilizer_name_mapping.get(prediction, 'Unknown')

    # Get the fertilizer description
    fertilizer_description = fertilizer_descriptions.get(fertilizer_name, 'No description available')

    # Return the result as JSON
    return jsonify({
        'Fertilizer Name': fertilizer_name,
        'Description': fertilizer_description,
        'Soil Type': soil_type_inverse_mapping[soil_type],
        'Crop Type': crop_type_inverse_mapping[crop_type],
        'Temparature': temperature,
        'Humidity': humidity,
        'Soil Moisture': soil_moisture,
        'Nitrogen': nitrogen,
        'Potassium': potassium,
        'Phosphorous': phosphorous
    })

@app.route('/crop_yield', methods=['POST'])
def crop_yield():
    data = request.get_json()

    # Extract data from the request
    area = data.get('Area')
    district = data.get('District')
    crop = data.get('Crop')
    season = data.get('Season')

    # Initialize the input data dictionary with 0s for all columns
    input_data = {col: False for col in rf_cols}

    # Set the specific values based on the request
    input_data['Area'] = area
    input_data[f'District_Name_{district.upper()}'] = True
    input_data[f'Crop_{crop}'] = True
    input_data[f'Season_{season.capitalize()}'] = True

    # Generate a random year between 1997 and 2015
    input_data['Crop_Year'] = random.randint(1997, 2015)

    # Convert the input data dictionary to a DataFrame
    df_input = pd.DataFrame([input_data])

    # Make the prediction
    predicted_yield = rf_model.predict(df_input)[0]
    return jsonify({
        'Predicted Crop Yield': predicted_yield,
        'Area': area,
        'District': district,
        'Crop': crop,
        'Season': season,
        'Year': input_data['Crop_Year']
    })

if __name__ == '__main__':
    app.run(debug=True)
