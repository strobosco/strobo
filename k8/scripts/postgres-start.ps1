cd ..\postgres
echo "starting postgres...`n"

kubectl create ns postgres
echo "postgres ns ok`n"

kubectl apply -f ./persistentvolume.yaml
echo "postgres pv ok`n"

kubectl apply -f ./persistentvolumeclaim.yaml
echo "postgres pvc ok`n"

kubectl apply -n postgres -f ./postgresstatefulset.yaml
echo "postgres statefulset ok`n"

cd ..\scripts

kubectl get all -n postgres