import pickle

model = pickle.load(open(r'saved_model.pkl','rb'))

'Longitude','Latitude','Month'

Longitude = float(input('Please enter Longitude: '))
print('\n')

Latitude = float(input('Please enter Latitude: '))
print('\n')

Month = int(input('Please enter Month: '))
print('\n')

pred = model.predict([[Longitude,Latitude,Month]])

rainfall = pred[0][0]
temperature = pred[0][1]

output = f"Rainfall = {rainfall:.2f}, Temperature = {temperature:.2f}"

print(output)