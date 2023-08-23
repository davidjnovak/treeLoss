import pandas as pd
import matplotlib.pyplot as plt

# Read the CSV file
df = pd.read_csv("PelletPlants.csv")

# Convert the string representation of lists to actual lists
df['50 lossyr'] = df['50 lossyr'].apply(lambda x: eval(x))
df['75 lossyr'] = df['75 lossyr'].apply(lambda x: eval(x))

# Visualization
def plot_loss_for_plant(index):
    years = list(range(2000, 2021))
    
    plt.figure(figsize=(10, 6))
    plt.plot(years, df['50 lossyr'].iloc[index], label='50 lossyr', color='blue')
    plt.plot(years, df['75 lossyr'].iloc[index], label='75 lossyr', color='red')
    
    plt.title(f"Loss Yearly Acreage for {df['Facility Name'].iloc[index]}")
    plt.xlabel('Year')
    plt.ylabel('Acreage Loss')
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()

# Plot for the first pellet plant (can be looped for all plants)
plot_loss_for_plant(0)
