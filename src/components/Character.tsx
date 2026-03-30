import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import useActiveSection from "../hooks/useActiveSection";
import { Group } from "three";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Character() {
  const group = useRef<Group>(null!);
  const { scene, animations } = useGLTF("mi-pj(final).glb");
  const { actions } = useAnimations(animations, group);
  const activeSection = useActiveSection(["about", "skills", "projects", "contact"]);
  const notebookref = useRef<THREE.Mesh>(null)

  useEffect(() => {
    if(!actions) return;
    const notebook = scene.getObjectByName("notebook") as THREE.Mesh;   
    if(notebook){
      notebookref.current = notebook;
    }
    if (activeSection !== "skills" && !notebookref.current!.visible) {
      notebook.visible = false;
      notebook.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = (child as THREE.Mesh).material as THREE.Material;
          m.transparent = true;
          m.opacity = 0;
        }
      });
    }
    Object.values(actions).forEach(action => action?.stop());
    switch (activeSection) {
      case "about":
        actions.saludo?.reset().setLoop(THREE.LoopRepeat, Infinity).play();
        break;
      case "projects":
        actions.show?.reset().setLoop(THREE.LoopRepeat, Infinity).play();
        break;
      case "skills":
        actions.typing?.reset().setLoop(THREE.LoopRepeat, Infinity).play();
        
        break;
      case "contact":
        actions.contacto?.reset().setLoop(THREE.LoopRepeat, Infinity).play();
        break;
    }
  }, [activeSection, actions,scene]);

  useFrame((_,delta)=> {
    if (!notebookref.current) return;
  const lerpSpeedin = delta * 3; 
  const lerpSpeedout = delta * 15;

  notebookref.current.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const m = (child as THREE.Mesh).material as THREE.Material;
      
      if (activeSection === "skills") {
        notebookref.current!.visible = true; 
        m.opacity = THREE.MathUtils.lerp(m.opacity, 1, lerpSpeedin);
      } else {
        if (m.opacity > 0.01) {
          m.opacity = THREE.MathUtils.lerp(m.opacity, 0, lerpSpeedout);
        } else if (notebookref.current!.visible) {
          m.opacity = 0;
          notebookref.current!.visible = false;
        }
      }
    }
    });
  })


  useEffect(() => {
  if (!actions) return;

  let nextAction: THREE.AnimationAction | undefined | null;
  switch (activeSection) {
    case "about": 
        nextAction = actions.saludo; 
      break;
    case "projects": 
        nextAction = actions.show; 
      break;
    case "skills": 
        nextAction = actions.typing; 
      break;
    case "contact": 
        nextAction = actions.contacto; 
      break;
      default:
        nextAction = actions.stay;
        break;
  }

  if (nextAction) {
    nextAction
      .reset()
      .setEffectiveWeight(1)
      .fadeIn(0.5)
      .play();
  }
  return () => {
    Object.values(actions).forEach((action) => {
      if (action !== nextAction) {
        action?.fadeOut(0.5); 
      }
    });
  };
}, [activeSection, actions, scene]);

  return (
    <primitive 
      object={scene}
      ref={group}
      scale={ 0.2} 
      position={[-0.1, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}
