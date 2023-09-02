import pandas as pd

df = pd.read_csv("PelletPlants.csv")

import ast

df['50 lossyr'] = df['50 lossyr'].apply(ast.literal_eval)
df['75 lossyr'] = df['75 lossyr'].apply(ast.literal_eval)

def avg_loss_before_after(loss_list, open_year, start_year=2000):
    #data constraints
        #only take the previous 5 years for before
        #if the after open is fewer than 3 years, exclude that 
    before_open = [loss_list[i] for i in range(open_year - start_year) if i < len(loss_list)]
    after_open = [loss_list[i] for i in range(open_year - start_year, len(loss_list)) if i < len(loss_list)]
    avg_before = sum(before_open) / len(before_open) if before_open else 0
    avg_after = sum(after_open) / len(after_open) if after_open else 0
    print(avg_before, avg_after)
    
    return avg_before, avg_after

df['avg_50_loss_before'], df['avg_50_loss_after'] = zip(*df.apply(lambda row: avg_loss_before_after(row['50 lossyr'], row['Open Year']), axis=1))
df['avg_75_loss_before'], df['avg_75_loss_after'] = zip(*df.apply(lambda row: avg_loss_before_after(row['75 lossyr'], row['Open Year']), axis=1))

# print(df['avg_75_loss_before'], df['avg_75_loss_after'])

# state_summary = df.groupby('State').mean()[['avg_50_loss_before', 'avg_50_loss_after', 'avg_75_loss_before', 'avg_75_loss_after']]
# print(state_summary)
