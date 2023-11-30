def generate( numRows):
        
        x=1
        l=[[1]]
        for i in range(numRows):
            m=[1,1]
            x=0
            for j in range(1,i):
                m.insert(j,sum([n[:l.index(n)+2] for n in l[-1]]))
            l.append(m)
        return l
print(generate(5))