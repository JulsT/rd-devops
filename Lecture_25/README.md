For this task, I installed kubectl and configured aws-cli.

1.Before creating the cluster, I created IAM roles for EKS and the Node Group (though the policies I added were not sufficient — which led to an interesting issue related to PVC and Pod creation with EBS). I also created a VPC with two public subnets.

2.Cluster creation was unsuccessful in Auto mode because it generates two (or more) node instances of a type I couldn’t change or control.

3.In the Compute tab, I added a Node Group manually.

4.After all these resources were created, I connected to the cluster using:
aws eks --region <region> update-kubeconfig --name <cluster-name>
![alt text](<Знімок екрана 2025-06-15 203717.png>)

5.I created all the necessary resources (located in the current directory) and applied them using:
kubectl apply -f <file_name.yaml>
![alt text](<Знімок екрана 2025-06-15 205251.png>)
![alt text](<Знімок екрана 2025-06-15 205425.png>)

6.To get the external IP of the service:
kubectl get service nginx-service
![alt text](<Знімок екрана 2025-06-15 212059.png>)

7.PVC creation required additional policies for my IAM role. I also had to install the EBS CSI driver add-on and restart the instances.
![alt text](<Знімок екрана 2025-06-15 223436.png>)
![alt text](<Знімок екрана 2025-06-15 223756.png>)
8.Created a Job:
kubectl apply -f hello-job.yaml
kubectl get jobs
kubectl get pods
kubectl logs hello-job-5xrdf
![alt text](<Знімок екрана 2025-06-15 224047.png>)
9.Created a Service:
kubectl get svc nginx-clusterip-service
Then, ran a temporary pod to access the service:
kubectl run -it --rm debug --image=busybox --restart=Never -- sh
![alt text](<Знімок екрана 2025-06-15 224415.png>)
10.Created a namespace:
kubectl create namespace dev
kubectl apply -f busybox-deployment.yaml
![alt text](<Знімок екрана 2025-06-15 224854.png>)
11.Deleted all resources using:
kubectl delete -f <file_name.yaml>
kubectl delete