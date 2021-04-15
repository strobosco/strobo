cd ../nginx/config
echo "starting nginx...`n"

kubectl apply -f ./namespace.yaml
echo "namespace ok`n"

kubectl apply -f ./service-account.yaml
echo "service account ok`n"

kubectl apply -f ./cluster-role.yaml
echo "cluster role ok`n"

kubectl apply -f ./cluster-role-binding.yaml
echo "cluster role binding ok`n"

kubectl apply -f ./configMap.yaml
echo "configmap applied`n"

kubectl apply -f ./custom-snippets.configmap.yaml
echo "custom snippets applied`n"

kubectl apply -f ./deployment.yaml
echo "deployment ok`n"

kubectl apply -f ./service.yaml
echo "service ok`n"

kubectl apply -f ./tls-secret.yaml
echo "tls secret ok`n"

cd ..\scripts

kubectl get all -n ingress-nginx