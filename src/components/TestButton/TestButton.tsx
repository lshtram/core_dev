import React from 'react';
import styles from './TestButton.module.css';

interface TestButtonProps {
  /**
   * Primary label for the component
   */
  label?: string;
}

/**
 * @context UI Component
 * @desc [Add description]
 */
export const TestButton: React.FC<TestButtonProps> = ({ label = 'Default' }) => {
  return (
    <div className={styles.container}>
      {label}
    </div>
  );
};
