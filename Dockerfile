FROM node:16
RUN git clone https://github.com/Ntee-j01/NTEEJ-MD /root/Ntee-j01
WORKDIR /root/Ntee-j01 
RUN npm install
EXPOSE 3000
CMD ["npm","start" ] 
#Nteej
